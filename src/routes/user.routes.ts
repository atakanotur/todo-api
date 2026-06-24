import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { requireAuth } from '../middlewares/authMiddleware';
import { updateProfileSchema } from '../schemas/user.schema';

const router = Router();

// Bütün kullanıcı rotaları yetki (auth) gerektirir
router.use(requireAuth);

router.get('/me', userController.getMe);

router.put(
  '/profile',
  validateRequest(updateProfileSchema),
  userController.updateProfile
);

export default router;
