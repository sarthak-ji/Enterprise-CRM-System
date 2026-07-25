// filepath: src/services/api/errorHandler.js
// Global API error handler. Converts axios errors into user-friendly messages.
import toast from 'react-hot-toast';

export const handleApiError = (error, customMessage) => {
  const message = customMessage || error?.response?.data?.message || error?.message || 'Something went wrong';
  toast.error(message);
  // TODO: route 401s to refresh-token flow, 403 to logout, 5xx to logger
  return { error: true, message, status: error?.response?.status };
};
