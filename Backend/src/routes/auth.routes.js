// filepath: src/routes/auth.routes.js
// Authentication API routes — /api/v1/auth

import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from '../validators/auth.validator.js';

const router = Router();

router.post('/register', authLimiter, registerValidator, validate, authCtrl.register);
router.post('/login', authLimiter, loginValidator, validate, authCtrl.login);
router.post('/logout', verifyJWT, authCtrl.logout);
router.post('/refresh-token', authCtrl.refreshToken);
router.post('/forgot-password', authLimiter, forgotPasswordValidator, validate, authCtrl.forgotPassword);
router.post('/reset-password/:token', resetPasswordValidator, validate, authCtrl.resetPassword);
router.get('/me', verifyJWT, authCtrl.getCurrentUser);

export default router;
