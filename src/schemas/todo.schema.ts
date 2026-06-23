import { z } from 'zod';

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().optional(),
    completed: z.boolean().optional(),
  }),
});

export const updateTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
  }),
});
