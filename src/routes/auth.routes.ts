import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { requireAuth } from '../middlewares/authMiddleware';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from '../schemas/auth.schema';

const router = Router();

router.post(
  '/register',
  validateRequest(registerSchema),
  authController.register
);

router.post('/login', validateRequest(loginSchema), authController.login);

router.post(
  '/refresh',
  validateRequest(refreshTokenSchema),
  authController.refresh
);

router.post('/logout', requireAuth, authController.logout);

export default router;
