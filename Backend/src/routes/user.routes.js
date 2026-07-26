// filepath: src/routes/user.routes.js
// User management API routes — /api/v1/users

import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { ROLES } from '../constants/roles.constant.js';

const router = Router();

// All user routes require authentication
router.use(verifyJWT);

router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.MANAGER), userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUserById);
router.put('/profile', userCtrl.updateProfile);
router.patch('/avatar', upload.single('avatar'), userCtrl.updateAvatar);
router.patch('/:id/role', authorizeRoles(ROLES.ADMIN), userCtrl.changeUserRole);
router.patch('/:id/deactivate', authorizeRoles(ROLES.ADMIN), userCtrl.deactivateUser);

export default router;
