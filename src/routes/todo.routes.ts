import { Router } from 'express';
import * as todoController from '../controllers/todo.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { requireAuth } from '../middlewares/authMiddleware';
import { createTodoSchema, updateTodoSchema } from '../schemas/todo.schema';

const router = Router();

// Apply auth middleware to all todo routes
router.use(requireAuth);

router.post(
  '/',
  validateRequest(createTodoSchema),
  todoController.createTodo
);

router.get('/', todoController.getTodos);

router.get('/:id', todoController.getTodoById);

router.put(
  '/:id',
  validateRequest(updateTodoSchema),
  todoController.updateTodo
);

router.delete('/:id', todoController.deleteTodo);

export default router;
