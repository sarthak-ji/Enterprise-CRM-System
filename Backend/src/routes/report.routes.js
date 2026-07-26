// filepath: src/routes/report.routes.js
// Sales Reports & Analytics API routes — /api/v1/reports

import { Router } from 'express';
import * as reportCtrl from '../controllers/report.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.get('/dashboard-summary', reportCtrl.getDashboardSummary);
router.get('/revenue', reportCtrl.getRevenueStats);
router.get('/lead-sources', reportCtrl.getLeadSourceStats);
router.get('/top-salespeople', reportCtrl.getTopSalespeople);

export default router;
