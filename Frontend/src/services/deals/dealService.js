// filepath: src/services/deals/dealService.js
// Deals feature API service.
import { axiosClient } from '@/services/api/axiosClient.js';
import { ENDPOINTS } from '@/services/api/endpoints.js';

export const dealService = {
  getAll: (params) => axiosClient.get(ENDPOINTS.deals.list, { params }),
  create: (data) => axiosClient.post(ENDPOINTS.deals.create, data),
  update: (id, data) => axiosClient.put(ENDPOINTS.deals.update(id), data),
  remove: (id) => axiosClient.delete(ENDPOINTS.deals.delete(id)),
};
