// filepath: src/config/env.js
// Centralized environment variables. Never read process.env directly elsewhere.
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Enterprise CRM',
  APP_VERSION: import.meta.env.VITE_APP_VERSION ?? '1.0.0',
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  TOKEN_KEY: 'crm_access_token',
  REFRESH_TOKEN_KEY: 'crm_refresh_token',
};
