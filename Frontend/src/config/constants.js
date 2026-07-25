// filepath: src/config/constants.js
// App-wide constants (status enums, roles, pagination defaults, etc.).
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES: 'sales',
  SUPPORT: 'support',
};

export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  LOST: 'lost',
  CONVERTED: 'converted',
};

export const DEAL_STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

export const SORT_ORDER = { ASC: 'asc', DESC: 'desc' };
