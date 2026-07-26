// filepath: src/validators/deal.validator.js
// Express-validator rules for deal CRUD endpoints.

import { body } from 'express-validator';
import { PIPELINE_STAGE, LEAD_PRIORITY } from '../constants/status.constant.js';

export const createDealValidator = [
  body('title').trim().notEmpty().withMessage('Deal title is required'),
  body('value').notEmpty().withMessage('Deal value is required').isNumeric().withMessage('Value must be a number'),
  body('stage').optional().isIn(Object.values(PIPELINE_STAGE)).withMessage('Invalid pipeline stage'),
  body('priority').optional().isIn(Object.values(LEAD_PRIORITY)).withMessage('Invalid priority'),
  body('expectedCloseDate').optional().isISO8601().withMessage('Invalid date format'),
];

export const updateDealValidator = [
  body('title').optional().trim().notEmpty().withMessage('Deal title cannot be empty'),
  body('value').optional().isNumeric().withMessage('Value must be a number'),
  body('stage').optional().isIn(Object.values(PIPELINE_STAGE)).withMessage('Invalid pipeline stage'),
  body('priority').optional().isIn(Object.values(LEAD_PRIORITY)).withMessage('Invalid priority'),
  body('expectedCloseDate').optional().isISO8601().withMessage('Invalid date format'),
];
