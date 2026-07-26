// filepath: src/controllers/user.controller.js
// User management HTTP controllers — profile update, avatar upload, list users.

import User from '../models/User.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary.service.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-refreshToken');
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, users, 'Users fetched successfully')
  );
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  return res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, user));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, phone, jobTitle } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { fullName, phone, jobTitle },
    { new: true, runValidators: true }
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, user, 'Profile updated successfully')
  );
});

export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Avatar file is required');

  // Delete old avatar from Cloudinary if it exists
  if (req.user.avatar?.public_id) {
    await deleteFromCloudinary(req.user.avatar.public_id);
  }

  const uploaded = await uploadToCloudinary(req.file.path, 'crm-avatars');

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: uploaded },
    { new: true }
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, user, 'Avatar updated successfully')
  );
});

export const changeUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
  if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, user, `User role updated to ${role}`)
  );
});

export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, user, 'User account deactivated')
  );
});
