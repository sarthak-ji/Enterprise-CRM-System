// filepath: src/services/customer.service.js
// Customer management business logic — CRUD, notes, search, filter, and LTV tracking.

import Customer from '../models/Customer.model.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const createCustomer = async (data, userId) => {
  const customer = await Customer.create({ ...data, createdBy: userId, owner: data.owner || userId });
  return customer;
};

export const getAllCustomers = async (query = {}) => {
  const { search, status, tier, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = query;
  const filter = {};

  if (search) filter.$text = { $search: search };
  if (status && status !== 'all') filter.status = status;
  if (tier && tier !== 'all') filter.tier = tier;

  const sortOrder = order === 'asc' ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [customers, total] = await Promise.all([
    Customer.find(filter)
      .populate('owner', 'fullName email avatar')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit)),
    Customer.countDocuments(filter),
  ]);

  return {
    customers,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalItems: total,
    },
  };
};

export const getCustomerById = async (id) => {
  const customer = await Customer.findById(id)
    .populate('owner', 'fullName email avatar')
    .populate('notes.author', 'fullName avatar');
  if (!customer) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Customer not found');
  return customer;
};

export const updateCustomer = async (id, data) => {
  const customer = await Customer.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate('owner', 'fullName email avatar');
  if (!customer) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Customer not found');
  return customer;
};

export const deleteCustomer = async (id) => {
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Customer not found');
  return customer;
};

export const addNoteToCustomer = async (id, content, userId) => {
  const customer = await Customer.findById(id);
  if (!customer) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Customer not found');

  customer.notes.unshift({ author: userId, content });
  await customer.save();

  const populated = await Customer.findById(id).populate('notes.author', 'fullName avatar');
  return populated;
};
