// filepath: src/utils/asyncHandler.js
/**
 * Higher-Order Async Route Handler Wrapper.
 * Wraps asynchronous Express route handlers to eliminate repetitive try-catch blocks
 * and automatically forward unhandled errors to the global error middleware.
 *
 * @param {Function} requestHandler - Async Express controller route function (req, res, next)
 * @returns {Function} Express middleware handler
 */
export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
