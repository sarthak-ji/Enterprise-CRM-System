// filepath: src/utils/formatters.js
// Reusable formatting helper utilities for currency, dates, text initials, and numbers.

/** Format number as USD currency ($128,450) */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount == null || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

/** Format date string into human readable format */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(date);
};

/** Extract 2-letter uppercase initials from full name */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return 'U';
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/** Truncate text with ellipsis */
export const truncateText = (text, maxLength = 30) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
