// filepath: src/utils/generateToken.js
/**
 * JWT Token Generation & Cookie Management Utilities.
 * Handles signing access/refresh tokens and configuring secure HTTP-only cookies.
 */
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config.js';

/**
 * Generate short-lived JWT Access Token.
 * @param {string} userId - User MongoDB ObjectId
 * @param {string} role - User RBAC role (admin, manager, sales_rep)
 * @returns {string} Signed JWT Access Token
 */
export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { _id: userId, role },
    ENV.JWT.ACCESS_SECRET,
    { expiresIn: ENV.JWT.ACCESS_EXPIRY }
  );
};

/**
 * Generate long-lived JWT Refresh Token.
 * @param {string} userId - User MongoDB ObjectId
 * @returns {string} Signed JWT Refresh Token
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    ENV.JWT.REFRESH_SECRET,
    { expiresIn: ENV.JWT.REFRESH_EXPIRY }
  );
};

/**
 * Cookie configuration options for secure HTTP-only storage.
 */
export const cookieOptions = Object.freeze({
  httpOnly: true,
  secure: ENV.NODE_ENV === 'production',
  sameSite: ENV.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days in milliseconds
});
