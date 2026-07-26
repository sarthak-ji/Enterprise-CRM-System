// filepath: src/routes/deal.routes.js
// Deal / Pipeline API routes — /api/v1/deals

import { Router } from 'express';
import * as dealCtrl from '../controllers/deal.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createDealValidator, updateDealValidator } from '../validators/deal.validator.js';

const router = Router();

router.use(verifyJWT);

router.get('/pipeline-summary', dealCtrl.getPipelineSummary);

router.route('/')
  .get(dealCtrl.getAllDeals)
  .post(createDealValidator, validate, dealCtrl.createDeal);

router.route('/:id')
  .get(dealCtrl.getDealById)
  .put(updateDealValidator, validate, dealCtrl.updateDeal)
  .delete(dealCtrl.deleteDeal);

router.patch('/:id/stage', dealCtrl.updateStage);

export default router;
