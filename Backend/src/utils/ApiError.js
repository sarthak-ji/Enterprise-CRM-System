// filepath: src/utils/ApiError.js
/**
 * Custom Operational Error Class for REST API.
 * Extends the native Error class with HTTP status codes, error details, and stack traces.
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (400-599)
   * @param {string} message - Error message
   * @param {Array} errors - Array of field validation or detail errors
   * @param {string} stack - Optional custom error stack trace
   */
  constructor(
    statusCode,
    message = 'Something went wrong',
    errors = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.data = null;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
