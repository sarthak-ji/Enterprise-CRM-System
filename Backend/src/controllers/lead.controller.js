// filepath: src/controllers/lead.controller.js
// Lead management HTTP controllers — full CRUD with filtering and pagination.

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as leadService from '../services/lead.service.js';

export const createLead = asyncHandler(async (req, res) => {
  const lead = await leadService.createLead(req.body, req.user._id);
  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(HTTP_STATUS.CREATED, lead, 'Lead created successfully')
  );
});

export const getAllLeads = asyncHandler(async (req, res) => {
  const result = await leadService.getAllLeads(req.query);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, result, 'Leads fetched successfully')
  );
});

export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await leadService.getLeadById(req.params.id);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, lead));
});

export const updateLead = asyncHandler(async (req, res) => {
  const lead = await leadService.updateLead(req.params.id, req.body);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, lead, 'Lead updated successfully')
  );
});

export const deleteLead = asyncHandler(async (req, res) => {
  await leadService.deleteLead(req.params.id);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, null, 'Lead deleted successfully')
  );
});
