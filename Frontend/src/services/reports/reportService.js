// filepath: src/services/reports/reportService.js
// Reports feature API service.
import { axiosClient } from '@/services/api/axiosClient.js';
import { ENDPOINTS } from '@/services/api/endpoints.js';

export const reportService = {
  getDashboardMetrics: () => axiosClient.get(ENDPOINTS.reports.dashboard),
  getSalesReport: (params) => axiosClient.get(ENDPOINTS.reports.sales, { params }),
};
