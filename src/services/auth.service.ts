import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { BadRequestError, UnauthorizedError } from '../utils/errors';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { z } from 'zod';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

type RegisterInput = z.infer<typeof registerSchema>['body'];
type LoginInput = z.infer<typeof loginSchema>['body'];

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async register(data: RegisterInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestError('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    const tokens = generateTokens({ userId: user.id });

    // Store refresh token
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: { id: user.id, email: user.email },
      tokens,
    };
  }

  async login(data: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const tokens = generateTokens({ userId: user.id });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: { id: user.id, email: user.email },
      tokens,
    };
  }

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const tokens = generateTokens({ userId: user.id });

    // Refresh token rotation
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}
