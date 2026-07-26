// filepath: src/constants/status.constant.js
// Enums for Lead, Customer, and Sales Pipeline Deal statuses and priorities.

export const LEAD_STATUS = Object.freeze({
  NEW: 'New',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  PROPOSAL: 'Proposal',
  NEGOTIATION: 'Negotiation',
  WON: 'Won',
  LOST: 'Lost',
});

export const LEAD_PRIORITY = Object.freeze({
  URGENT: 'Urgent',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
});

export const CUSTOMER_STATUS = Object.freeze({
  ACTIVE: 'Active',
  AT_RISK: 'At-Risk',
  PENDING: 'Pending',
  INACTIVE: 'Inactive',
});

export const CUSTOMER_TIER = Object.freeze({
  ENTERPRISE: 'Enterprise',
  PROFESSIONAL: 'Professional',
  STARTER: 'Starter',
});

export const PIPELINE_STAGE = Object.freeze({
  NEW: 'New',
  QUALIFIED: 'Qualified',
  PROPOSAL: 'Proposal',
  NEGOTIATION: 'Negotiation',
  WON: 'Won',
  LOST: 'Lost',
});
