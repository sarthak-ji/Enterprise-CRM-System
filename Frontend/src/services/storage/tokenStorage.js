// filepath: src/services/storage/tokenStorage.js
// Abstraction over localStorage for auth tokens. Swappable for cookies/httpOnly later.
import { ENV } from '@/config/env.js';

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ENV.TOKEN_KEY),
  setAccessToken: (token) => localStorage.setItem(ENV.TOKEN_KEY, token),
  getRefreshToken: () => localStorage.getItem(ENV.REFRESH_TOKEN_KEY),
  setRefreshToken: (token) => localStorage.setItem(ENV.REFRESH_TOKEN_KEY, token),
  clear: () => {
    localStorage.removeItem(ENV.TOKEN_KEY);
    localStorage.removeItem(ENV.REFRESH_TOKEN_KEY);
  },
};
