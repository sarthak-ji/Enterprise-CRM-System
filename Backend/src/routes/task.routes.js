// filepath: src/routes/task.routes.js
// Task management API routes — /api/v1/tasks

import { Router } from 'express';
import * as taskCtrl from '../controllers/task.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createTaskValidator, updateTaskValidator } from '../validators/task.validator.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .get(taskCtrl.getAllTasks)
  .post(createTaskValidator, validate, taskCtrl.createTask);

router.route('/:id')
  .get(taskCtrl.getTaskById)
  .put(updateTaskValidator, validate, taskCtrl.updateTask)
  .delete(taskCtrl.deleteTask);

export default router;
