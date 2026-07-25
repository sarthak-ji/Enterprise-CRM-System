// filepath: src/utils/validators.js
// Reusable validation rules. Compatible with React Hook Form's `rules` prop.
export const validators = {
  required: (msg = 'This field is required') => ({ required: msg }),
  email: (msg = 'Invalid email address') => ({
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: msg },
  }),
  minLength: (n, msg) => ({ minLength: { value: n, message: msg || `Minimum ${n} characters` } }),
  maxLength: (n, msg) => ({ maxLength: { value: n, message: msg || `Maximum ${n} characters` } }),
};
