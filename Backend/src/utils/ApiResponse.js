// filepath: src/utils/ApiResponse.js
/**
 * Standardized REST API Success Response Envelope.
 * Enforces consistent JSON response structure across all controllers.
 */
export class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code (200-399)
   * @param {any} data - Response payload (object, array, null)
   * @param {string} message - Human-readable success message
   */
  constructor(statusCode, data = null, message = 'Success') {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}
