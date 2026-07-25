// filepath: src/hooks/useForm.js
// Lightweight form state helper. Pair with React Hook Form for complex validation.
import { useState } from 'react';

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
  };
  const reset = () => setValues(initialValues);
  return { values, setValues, handleChange, reset };
};
