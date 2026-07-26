// filepath: src/validators/task.validator.js
// Express-validator rules for task CRUD endpoints.

import { body } from 'express-validator';

export const createTaskValidator = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed', 'Cancelled']).withMessage('Invalid task status'),
  body('priority').optional().isIn(['Urgent', 'High', 'Medium', 'Low']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
];

export const updateTaskValidator = [
  body('title').optional().trim().notEmpty().withMessage('Task title cannot be empty'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed', 'Cancelled']).withMessage('Invalid task status'),
  body('priority').optional().isIn(['Urgent', 'High', 'Medium', 'Low']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
];
