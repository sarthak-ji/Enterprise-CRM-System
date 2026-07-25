// filepath: src/services/api/endpoints.js
// Centralized API endpoint map. Keeps URLs out of feature code.
export const ENDPOINTS = {
  auth: { login: '/auth/login', logout: '/auth/logout', refresh: '/auth/refresh', me: '/auth/me' },
  users: { list: '/users', detail: (id) => `/users/${id}`, create: '/users', update: (id) => `/users/${id}`, delete: (id) => `/users/${id}` },
  leads: { list: '/leads', create: '/leads', update: (id) => `/leads/${id}`, delete: (id) => `/leads/${id}` },
  customers: { list: '/customers', create: '/customers', update: (id) => `/customers/${id}`, delete: (id) => `/customers/${id}` },
  deals: { list: '/deals', create: '/deals', update: (id) => `/deals/${id}`, delete: (id) => `/deals/${id}` },
  tasks: { list: '/tasks', create: '/tasks', update: (id) => `/tasks/${id}`, delete: (id) => `/tasks/${id}` },
  reports: { dashboard: '/reports/dashboard', sales: '/reports/sales' },
};
