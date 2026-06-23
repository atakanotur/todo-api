"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../utils/errors");
const jwt_1 = require("../utils/jwt");
class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(data) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new errors_1.BadRequestError('Email is already in use');
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 12);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            },
        });
        const tokens = (0, jwt_1.generateTokens)({ userId: user.id });
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
    async login(data) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError('Invalid credentials');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new errors_1.UnauthorizedError('Invalid credentials');
        }
        const tokens = (0, jwt_1.generateTokens)({ userId: user.id });
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: tokens.refreshToken },
        });
        return {
            user: { id: user.id, email: user.email },
            tokens,
        };
    }
    async refresh(refreshToken) {
        const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const user = await this.prisma.user.findUnique({
            where: { id: payload.userId },
        });
        if (!user || user.refreshToken !== refreshToken) {
            throw new errors_1.UnauthorizedError('Invalid refresh token');
        }
        const tokens = (0, jwt_1.generateTokens)({ userId: user.id });
        // Refresh token rotation
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: tokens.refreshToken },
        });
        return tokens;
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
    }
}
exports.AuthService = AuthService;
