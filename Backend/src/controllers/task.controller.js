// filepath: src/controllers/task.controller.js
// Task HTTP controllers — CRUD for follow-ups and agenda items.

import Task from '../models/Task.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user._id });
  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(HTTP_STATUS.CREATED, task, 'Task created successfully')
  );
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const { status, priority, assignedTo, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (status && status !== 'all') filter.status = status;
  if (priority && priority !== 'all') filter.priority = priority;
  if (assignedTo) filter.assignedTo = assignedTo;

  const skip = (Number(page) - 1) * Number(limit);

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .populate('assignedTo', 'fullName email avatar')
      .populate('createdBy', 'fullName')
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, {
      tasks,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      },
    })
  );
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignedTo', 'fullName email avatar')
    .populate('relatedLead', 'name company')
    .populate('relatedDeal', 'title value stage')
    .populate('relatedCustomer', 'name company');
  if (!task) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Task not found');
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, task));
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('assignedTo', 'fullName email avatar');
  if (!task) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Task not found');
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, task, 'Task updated successfully')
  );
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Task not found');
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, null, 'Task deleted successfully')
  );
});
