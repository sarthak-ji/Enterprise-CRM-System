// filepath: src/validators/customer.validator.js
// Express-validator rules for customer CRUD endpoints.

import { body } from 'express-validator';
import { CUSTOMER_STATUS, CUSTOMER_TIER } from '../constants/status.constant.js';

export const createCustomerValidator = [
  body('name').trim().notEmpty().withMessage('Contact name is required'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('status').optional().isIn(Object.values(CUSTOMER_STATUS)).withMessage('Invalid status'),
  body('tier').optional().isIn(Object.values(CUSTOMER_TIER)).withMessage('Invalid tier'),
];

export const updateCustomerValidator = [
  body('name').optional().trim().notEmpty().withMessage('Contact name cannot be empty'),
  body('email').optional().trim().isEmail().withMessage('Invalid email'),
  body('company').optional().trim().notEmpty().withMessage('Company name cannot be empty'),
  body('status').optional().isIn(Object.values(CUSTOMER_STATUS)).withMessage('Invalid status'),
  body('tier').optional().isIn(Object.values(CUSTOMER_TIER)).withMessage('Invalid tier'),
];
