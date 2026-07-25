// filepath: src/services/customers/customerService.js
// Customers feature API service.
import { axiosClient } from '@/services/api/axiosClient.js';
import { ENDPOINTS } from '@/services/api/endpoints.js';

export const customerService = {
  getAll: (params) => axiosClient.get(ENDPOINTS.customers.list, { params }),
  getById: (id) => axiosClient.get(ENDPOINTS.customers.update(id)),
  create: (data) => axiosClient.post(ENDPOINTS.customers.create, data),
  update: (id, data) => axiosClient.put(ENDPOINTS.customers.update(id), data),
  remove: (id) => axiosClient.delete(ENDPOINTS.customers.delete(id)),
};
