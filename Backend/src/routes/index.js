// filepath: src/routes/index.js
// Master API router — mounts all feature module routes under /api/v1.

import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import leadRoutes from './lead.routes.js';
import customerRoutes from './customer.routes.js';
import dealRoutes from './deal.routes.js';
import taskRoutes from './task.routes.js';
import reportRoutes from './report.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/leads', leadRoutes);
router.use('/customers', customerRoutes);
router.use('/deals', dealRoutes);
router.use('/tasks', taskRoutes);
router.use('/reports', reportRoutes);

export default router;
