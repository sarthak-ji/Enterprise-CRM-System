// filepath: src/design-system/tokens.js
// JavaScript mirror of the design tokens. Use when you need to apply values dynamically
// (e.g. inline styles, chart configs, framer-motion variants).

export const colors = {
  brand:   { 50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81' },
  accent:  { 400:'#22d3ee',500:'#06b6d4',600:'#0891b2' },
  success: { 50:'#ecfdf5',500:'#10b981',600:'#059669',700:'#047857' },
  warning: { 50:'#fffbeb',500:'#f59e0b',600:'#d97706',700:'#b45309' },
  danger:  { 50:'#fef2f2',500:'#ef4444',600:'#dc2626',700:'#b91c1c' },
  info:    { 50:'#eff6ff',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8' },
};

export const statusMap = {
  // Pipeline / deal stages
  new:        { label: 'New',        tone: 'brand',   dot: 'ds-status-active' },
  contacted:  { label: 'Contacted',  tone: 'info',    dot: 'ds-status-active' },
  qualified:  { label: 'Qualified',  tone: 'success', dot: 'ds-status-active' },
  proposal:   { label: 'Proposal',   tone: 'warning', dot: 'ds-status-pending' },
  negotiation:{ label: 'Negotiation',tone: 'warning', dot: 'ds-status-pending' },
  won:        { label: 'Won',        tone: 'success', dot: 'ds-status-active' },
  lost:       { label: 'Lost',       tone: 'danger',  dot: 'ds-status-error' },
  active:     { label: 'Active',     tone: 'success', dot: 'ds-status-active' },
  inactive:   { label: 'Inactive',   tone: 'neutral', dot: 'ds-status-inactive' },
  pending:    { label: 'Pending',    tone: 'warning', dot: 'ds-status-pending' },
};

export const spacing = {
  xs: '0.5rem', sm: '0.75rem', md: '1rem', lg: '1.5rem', xl: '2rem', '2xl': '3rem',
};

export const radius = {
  xs: '0.25rem', sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', card: '0.875rem', pill: '9999px',
};

export const shadow = {
  xs: '0 1px 2px 0 rgb(15 23 42 / 0.04)',
  sm: '0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.04)',
  md: '0 4px 6px -1px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.05)',
  lg: '0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.05)',
  xl: '0 20px 25px -5px rgb(15 23 42 / 0.10), 0 8px 10px -6px rgb(15 23 42 / 0.04)',
  glow: '0 0 30px -5px rgb(99 102 241 / 0.40)',
};

export const motion = {
  fast:    { duration: 0.12, ease: [0.4, 0, 0.2, 1] },
  normal:  { duration: 0.20, ease: [0.4, 0, 0.2, 1] },
  slow:    { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
  spring:  { type: 'spring', stiffness: 380, damping: 30 },
};
