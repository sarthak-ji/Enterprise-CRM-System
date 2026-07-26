// filepath: src/middleware/validate.middleware.js
// Express-validator error collector — checks for validation errors and returns 422 response.

import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    throw new ApiError(
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      'Validation failed',
      extractedErrors
    );
  }

  next();
};
