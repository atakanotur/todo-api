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

router.post(
  '/login',
  (req, res, next) => {
    // Kurumsal Loglama: Gelen datayı Zod validasyonundan önce logluyoruz (Şifreyi gizleyerek)
    console.log(`🔑 [Login Request - ${new Date().toISOString()}] Gelen Data (Pre-Validation):`, {
      email: req.body?.email || 'Belirtilmedi',
      password: req.body?.password ? '*** MASKED ***' : 'Belirtilmedi',
      ip: req.ip || req.socket.remoteAddress,
      headers: { 'content-type': req.headers['content-type'] }
    });
    next();
  },
  validateRequest(loginSchema),
  authController.login
);

router.post(
  '/refresh',
  validateRequest(refreshTokenSchema),
  authController.refresh
);

router.post('/logout', requireAuth, authController.logout);

export default router;
