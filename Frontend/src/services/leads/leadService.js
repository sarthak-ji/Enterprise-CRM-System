// filepath: src/services/leads/leadService.js
// Leads feature API service. One file per feature keeps domain logic isolated.
import { axiosClient } from '@/services/api/axiosClient.js';
import { ENDPOINTS } from '@/services/api/endpoints.js';

export const leadService = {
  getAll: (params) => axiosClient.get(ENDPOINTS.leads.list, { params }),
  getById: (id) => axiosClient.get(ENDPOINTS.leads.update(id)),
  create: (data) => axiosClient.post(ENDPOINTS.leads.create, data),
  update: (id, data) => axiosClient.put(ENDPOINTS.leads.update(id), data),
  remove: (id) => axiosClient.delete(ENDPOINTS.leads.delete(id)),
};
