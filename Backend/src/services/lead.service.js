// filepath: src/services/lead.service.js
// Lead management business logic — CRUD, search, filter, and owner assignment.

import Lead from '../models/Lead.model.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const createLead = async (data, userId) => {
  const lead = await Lead.create({ ...data, createdBy: userId, owner: data.owner || userId });
  return lead;
};

export const getAllLeads = async (query = {}) => {
  const { search, status, priority, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = query;
  const filter = {};

  if (search) {
    filter.$text = { $search: search };
  }
  if (status && status !== 'all') filter.status = status;
  if (priority && priority !== 'all') filter.priority = priority;

  const sortOrder = order === 'asc' ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .populate('owner', 'fullName email avatar')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit)),
    Lead.countDocuments(filter),
  ]);

  return {
    leads,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalItems: total,
    },
  };
};

export const getLeadById = async (id) => {
  const lead = await Lead.findById(id).populate('owner', 'fullName email avatar').populate('createdBy', 'fullName');
  if (!lead) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Lead not found');
  return lead;
};

export const updateLead = async (id, data) => {
  const lead = await Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('owner', 'fullName email avatar');
  if (!lead) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Lead not found');
  return lead;
};

export const deleteLead = async (id) => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Lead not found');
  return lead;
};
