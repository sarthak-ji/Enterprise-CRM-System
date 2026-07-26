// filepath: src/middleware/auth.middleware.js
// JWT Authentication middleware — verifies access token from cookies or Authorization header.

import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import User from '../models/User.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized — access token is missing');
  }

  const decoded = jwt.verify(token, ENV.JWT.ACCESS_SECRET);

  const user = await User.findById(decoded._id).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid access token — user not found');
  }

  req.user = user;
  next();
});
