import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors';
import { z } from 'zod';
import { createTodoSchema, updateTodoSchema } from '../schemas/todo.schema';

type CreateTodoInput = z.infer<typeof createTodoSchema>['body'];
type UpdateTodoInput = z.infer<typeof updateTodoSchema>['body'];

export class TodoService {
  constructor(private prisma: PrismaClient) {}

  async createTodo(userId: string, data: CreateTodoInput) {
    return this.prisma.todo.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getTodos(userId: string) {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTodoById(userId: string, todoId: string) {
    const todo = await this.prisma.todo.findFirst({
      where: {
        id: todoId,
        userId,
      },
    });

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    return todo;
  }

  async updateTodo(userId: string, todoId: string, data: UpdateTodoInput) {
    // Ensure the todo exists and belongs to the user
    await this.getTodoById(userId, todoId);

    return this.prisma.todo.update({
      where: { id: todoId },
      data,
    });
  }

  async deleteTodo(userId: string, todoId: string) {
    // Ensure the todo exists and belongs to the user
    await this.getTodoById(userId, todoId);

    await this.prisma.todo.delete({
      where: { id: todoId },
    });
  }
}
