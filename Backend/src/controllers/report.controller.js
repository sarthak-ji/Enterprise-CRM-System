// filepath: src/controllers/report.controller.js
// Sales Reports & Analytics HTTP controllers — aggregation endpoints for dashboard charts.

import Deal from '../models/Deal.model.js';
import Lead from '../models/Lead.model.js';
import Customer from '../models/Customer.model.js';
import User from '../models/User.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getRevenueStats = asyncHandler(async (req, res) => {
  const stats = await Deal.aggregate([
    { $match: { stage: 'Won' } },
    {
      $group: {
        _id: { $month: '$createdAt' },
        revenue: { $sum: '$value' },
        deals: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, stats, 'Revenue statistics fetched')
  );
});

export const getLeadSourceStats = asyncHandler(async (req, res) => {
  const stats = await Lead.aggregate([
    { $group: { _id: '$source', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, stats, 'Lead source statistics fetched')
  );
});

export const getTopSalespeople = asyncHandler(async (req, res) => {
  const stats = await Deal.aggregate([
    { $match: { stage: 'Won' } },
    {
      $group: {
        _id: '$owner',
        totalRevenue: { $sum: '$value' },
        dealsClosed: { $sum: 1 },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
        pipeline: [{ $project: { fullName: 1, email: 1, avatar: 1 } }],
      },
    },
    { $unwind: '$user' },
  ]);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, stats, 'Top salespeople fetched')
  );
});

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const [totalLeads, totalCustomers, totalDeals, totalRevenue, pipelineValue] = await Promise.all([
    Lead.countDocuments(),
    Customer.countDocuments(),
    Deal.countDocuments(),
    Deal.aggregate([{ $match: { stage: 'Won' } }, { $group: { _id: null, total: { $sum: '$value' } } }]),
    Deal.aggregate([
      { $match: { stage: { $nin: ['Won', 'Lost'] } } },
      { $group: { _id: null, total: { $sum: '$value' } } },
    ]),
  ]);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, {
      totalLeads,
      totalCustomers,
      totalDeals,
      totalRevenue: totalRevenue[0]?.total || 0,
      pipelineValue: pipelineValue[0]?.total || 0,
    })
  );
});
