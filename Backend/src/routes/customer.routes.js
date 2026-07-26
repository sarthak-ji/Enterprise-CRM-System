// filepath: src/routes/customer.routes.js
// Customer management API routes — /api/v1/customers

import { Router } from 'express';
import * as customerCtrl from '../controllers/customer.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createCustomerValidator, updateCustomerValidator } from '../validators/customer.validator.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .get(customerCtrl.getAllCustomers)
  .post(createCustomerValidator, validate, customerCtrl.createCustomer);

router.route('/:id')
  .get(customerCtrl.getCustomerById)
  .put(updateCustomerValidator, validate, customerCtrl.updateCustomer)
  .delete(customerCtrl.deleteCustomer);

router.post('/:id/notes', customerCtrl.addNote);

export default router;
