// filepath: src/constants/app.constants.js
// Centralized application constants for pagination, roles, statuses, and options.

export const PAGINATION_DEFAULTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

export const LEAD_STATUSES = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  PROPOSAL: 'Proposal',
  NEGOTIATION: 'Negotiation',
  WON: 'Won',
  LOST: 'Lost',
};

export const LEAD_PRIORITIES = {
  URGENT: 'Urgent',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export const CUSTOMER_STATUSES = {
  ACTIVE: 'Active',
  AT_RISK: 'At-Risk',
  PENDING: 'Pending',
  INACTIVE: 'Inactive',
};

export const CUSTOMER_TIERS = {
  ENTERPRISE: 'Enterprise',
  PROFESSIONAL: 'Professional',
  STARTER: 'Starter',
};
