// filepath: src/constants/roles.constant.js
// User roles and permission levels for Role-Based Access Control (RBAC).

export const ROLES = Object.freeze({
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES_REP: 'sales_rep',
});

export const ALL_ROLES = Object.values(ROLES);
