// filepath: src/routes/lead.routes.js
// Lead management API routes — /api/v1/leads

import { Router } from 'express';
import * as leadCtrl from '../controllers/lead.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createLeadValidator, updateLeadValidator } from '../validators/lead.validator.js';

const router = Router();

router.use(verifyJWT);

router.route('/')
  .get(leadCtrl.getAllLeads)
  .post(createLeadValidator, validate, leadCtrl.createLead);

router.route('/:id')
  .get(leadCtrl.getLeadById)
  .put(updateLeadValidator, validate, leadCtrl.updateLead)
  .delete(leadCtrl.deleteLead);

export default router;
