// filepath: src/controllers/deal.controller.js
// Deal / Pipeline HTTP controllers — CRUD, stage updates, and pipeline summary.

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as dealService from '../services/deal.service.js';

export const createDeal = asyncHandler(async (req, res) => {
  const deal = await dealService.createDeal(req.body, req.user._id);
  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(HTTP_STATUS.CREATED, deal, 'Deal created successfully')
  );
});

export const getAllDeals = asyncHandler(async (req, res) => {
  const result = await dealService.getAllDeals(req.query);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, result, 'Deals fetched successfully')
  );
});

export const getDealById = asyncHandler(async (req, res) => {
  const deal = await dealService.getDealById(req.params.id);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, deal));
});

export const updateDeal = asyncHandler(async (req, res) => {
  const deal = await dealService.updateDeal(req.params.id, req.body);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, deal, 'Deal updated successfully')
  );
});

export const updateStage = asyncHandler(async (req, res) => {
  const deal = await dealService.updateDealStage(req.params.id, req.body.stage);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, deal, `Deal moved to ${req.body.stage}`)
  );
});

export const deleteDeal = asyncHandler(async (req, res) => {
  await dealService.deleteDeal(req.params.id);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, null, 'Deal deleted successfully')
  );
});

export const getPipelineSummary = asyncHandler(async (req, res) => {
  const summary = await dealService.getPipelineSummary();
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, summary, 'Pipeline summary fetched')
  );
});
