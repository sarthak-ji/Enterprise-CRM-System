// filepath: src/controllers/customer.controller.js
// Customer management HTTP controllers — CRUD, notes, and profile endpoints.

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import * as customerService from '../services/customer.service.js';

export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.createCustomer(req.body, req.user._id);
  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(HTTP_STATUS.CREATED, customer, 'Customer created successfully')
  );
});

export const getAllCustomers = asyncHandler(async (req, res) => {
  const result = await customerService.getAllCustomers(req.query);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, result, 'Customers fetched successfully')
  );
});

export const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, customer));
});

export const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.updateCustomer(req.params.id, req.body);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, customer, 'Customer updated successfully')
  );
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  await customerService.deleteCustomer(req.params.id);
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, null, 'Customer deleted successfully')
  );
});

export const addNote = asyncHandler(async (req, res) => {
  const customer = await customerService.addNoteToCustomer(
    req.params.id,
    req.body.content,
    req.user._id
  );
  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(HTTP_STATUS.CREATED, customer, 'Note added successfully')
  );
});
