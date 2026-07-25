// filepath: src/services/api/axiosClient.js
// Single Axios instance with interceptors for auth tokens and global error handling.
import axios from 'axios';
import { ENV } from '@/config/env.js';
import { tokenStorage } from '@/services/storage/tokenStorage.js';

export const axiosClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling lives in services/api/errorHandler.js
    return Promise.reject(error);
  }
);
