import { Request, Response, NextFunction } from 'express';
import { TodoService } from '../services/todo.service';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/authMiddleware';

const todoService = new TodoService(prisma);

export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;
    const result = await todoService.createTodo(userId, req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;
    const result = await todoService.getTodos(userId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;
    const todoId = req.params.id;
    const result = await todoService.getTodoById(userId, todoId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;
    const todoId = req.params.id;
    const result = await todoService.updateTodo(userId, todoId, req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;
    const todoId = req.params.id;
    await todoService.deleteTodo(userId, todoId);
    res.status(200).json({
      success: true,
      data: { message: 'Todo deleted successfully' },
    });
  } catch (error) {
    next(error);
  }
};
