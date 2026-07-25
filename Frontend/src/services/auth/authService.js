// filepath: src/services/auth/authService.js
// Auth-specific API calls. Thin layer over axiosClient.
import { axiosClient } from '@/services/api/axiosClient.js';
import { ENDPOINTS } from '@/services/api/endpoints.js';
import { tokenStorage } from '@/services/storage/tokenStorage.js';

export const authService = {
  login: (credentials) => axiosClient.post(ENDPOINTS.auth.login, credentials),
  logout: () => axiosClient.post(ENDPOINTS.auth.logout),
  getCurrentUser: () => axiosClient.get(ENDPOINTS.auth.me),
  refreshToken: () => axiosClient.post(ENDPOINTS.auth.refresh, { refreshToken: tokenStorage.getRefreshToken() }),
};
