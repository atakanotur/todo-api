import { z } from 'zod'

export const updateProfileSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(100)
      .optional(),
    email: z.string().email('Invalid email format').optional(),
    firstName: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(100)
      .optional(),
    lastName: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(100)
      .optional(),
  }),
})
