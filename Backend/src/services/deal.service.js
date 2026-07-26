// filepath: src/services/deal.service.js
// Deal / Pipeline management business logic — CRUD, stage movement, and pipeline analytics.

import Deal from '../models/Deal.model.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const createDeal = async (data, userId) => {
  const deal = await Deal.create({ ...data, createdBy: userId, owner: data.owner || userId });
  return deal;
};

export const getAllDeals = async (query = {}) => {
  const { search, stage, priority, sortBy = 'createdAt', order = 'desc', page = 1, limit = 50 } = query;
  const filter = {};

  if (search) filter.$text = { $search: search };
  if (stage && stage !== 'all') filter.stage = stage;
  if (priority && priority !== 'all') filter.priority = priority;

  const sortOrder = order === 'asc' ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [deals, total] = await Promise.all([
    Deal.find(filter)
      .populate('owner', 'fullName email avatar')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit)),
    Deal.countDocuments(filter),
  ]);

  return {
    deals,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalItems: total,
    },
  };
};

export const getDealById = async (id) => {
  const deal = await Deal.findById(id)
    .populate('owner', 'fullName email avatar')
    .populate('customer', 'name company')
    .populate('lead', 'name email');
  if (!deal) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Deal not found');
  return deal;
};

export const updateDeal = async (id, data) => {
  const deal = await Deal.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate('owner', 'fullName email avatar');
  if (!deal) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Deal not found');
  return deal;
};

export const updateDealStage = async (id, newStage) => {
  const deal = await Deal.findByIdAndUpdate(id, { stage: newStage }, { new: true, runValidators: true })
    .populate('owner', 'fullName email avatar');
  if (!deal) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Deal not found');
  return deal;
};

export const deleteDeal = async (id) => {
  const deal = await Deal.findByIdAndDelete(id);
  if (!deal) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Deal not found');
  return deal;
};

export const getPipelineSummary = async () => {
  const summary = await Deal.aggregate([
    {
      $group: {
        _id: '$stage',
        count: { $sum: 1 },
        totalValue: { $sum: '$value' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return summary;
};
