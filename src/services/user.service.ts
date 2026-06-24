import { prisma } from '../config/db'
import { NotFoundError } from '../utils/errors'

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  return user
}

export const updateProfile = async (
  userId: string,
  data: { name?: string }
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return user
}
