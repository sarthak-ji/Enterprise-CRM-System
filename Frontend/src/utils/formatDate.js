// filepath: src/utils/formatDate.js
// Date formatting helpers — wrap Intl/Date so we have a single locale source.
const defaultLocale = 'en-US';

export const formatDate = (date, options = { year: 'numeric', month: 'short', day: '2-digit' }) =>
  date ? new Intl.DateTimeFormat(defaultLocale, options).format(new Date(date)) : '—';

export const formatDateTime = (date) =>
  date ? new Intl.DateTimeFormat(defaultLocale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date)) : '—';
