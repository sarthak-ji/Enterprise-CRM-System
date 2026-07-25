// filepath: src/services/tasks/taskService.js
// Tasks feature API service.
import { axiosClient } from '@/services/api/axiosClient.js';
import { ENDPOINTS } from '@/services/api/endpoints.js';

export const taskService = {
  getAll: (params) => axiosClient.get(ENDPOINTS.tasks.list, { params }),
  create: (data) => axiosClient.post(ENDPOINTS.tasks.create, data),
  update: (id, data) => axiosClient.put(ENDPOINTS.tasks.update(id), data),
  remove: (id) => axiosClient.delete(ENDPOINTS.tasks.delete(id)),
};
