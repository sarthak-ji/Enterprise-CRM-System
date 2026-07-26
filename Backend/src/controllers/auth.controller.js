// filepath: src/controllers/auth.controller.js
// Authentication HTTP controllers — register, login, logout, refresh token, forgot/reset password.

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { cookieOptions } from '../utils/generateToken.js';
import * as authService from '../services/auth.service.js';
import { sendPasswordResetEmail, sendWelcomeEmail } from '../services/mail.service.js';

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  // Non-blocking welcome email
  sendWelcomeEmail(user.email, user.fullName).catch(() => {});

  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(HTTP_STATUS.CREATED, user, 'Account registered successfully')
  );
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(req.body);

  return res
    .status(HTTP_STATUS.OK)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(new ApiResponse(HTTP_STATUS.OK, { user, accessToken }, 'Logged in successfully'));
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user._id);

  return res
    .status(HTTP_STATUS.OK)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(HTTP_STATUS.OK, null, 'Logged out successfully'));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  const tokens = await authService.refreshAccessToken(incomingRefreshToken);

  return res
    .status(HTTP_STATUS.OK)
    .cookie('accessToken', tokens.accessToken, cookieOptions)
    .cookie('refreshToken', tokens.refreshToken, cookieOptions)
    .json(new ApiResponse(HTTP_STATUS.OK, tokens, 'Access token refreshed'));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const resetToken = await authService.generatePasswordResetToken(req.body.email);
  await sendPasswordResetEmail(req.body.email, resetToken);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, null, 'Password reset link sent to your email')
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, null, 'Password reset successful. You can now log in.')
  );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, req.user, 'Current user fetched')
  );
});
