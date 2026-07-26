// filepath: src/validators/lead.validator.js
// Express-validator rules for lead CRUD endpoints.

import { body } from 'express-validator';
import { LEAD_STATUS, LEAD_PRIORITY } from '../constants/status.constant.js';

export const createLeadValidator = [
  body('name').trim().notEmpty().withMessage('Lead name is required'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
  body('status').optional().isIn(Object.values(LEAD_STATUS)).withMessage('Invalid lead status'),
  body('priority').optional().isIn(Object.values(LEAD_PRIORITY)).withMessage('Invalid lead priority'),
  body('value').optional().isNumeric().withMessage('Value must be a number'),
];

export const updateLeadValidator = [
  body('name').optional().trim().notEmpty().withMessage('Lead name cannot be empty'),
  body('email').optional().trim().isEmail().withMessage('Invalid email'),
  body('status').optional().isIn(Object.values(LEAD_STATUS)).withMessage('Invalid lead status'),
  body('priority').optional().isIn(Object.values(LEAD_PRIORITY)).withMessage('Invalid lead priority'),
  body('value').optional().isNumeric().withMessage('Value must be a number'),
];
