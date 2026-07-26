// filepath: src/middleware/role.middleware.js
// Role-Based Access Control (RBAC) middleware — restricts endpoints to allowed roles.

import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        `Access denied — role "${req.user?.role || 'unknown'}" is not authorized for this resource`
      );
    }
    next();
  };
};
