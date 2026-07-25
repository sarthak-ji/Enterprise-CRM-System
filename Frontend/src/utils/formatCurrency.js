// filepath: src/utils/formatCurrency.js
// Currency formatting helper.
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount ?? 0);
