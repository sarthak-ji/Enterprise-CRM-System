// filepath: src/hooks/useDisclosure.js
// Custom hook for managing modal, drawer, or popover open/close visibility state.
import { useState, useCallback } from 'react';

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState(null);

  const open = useCallback((payload = null) => {
    if (payload !== null) setData(payload);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    data,
    setData,
    open,
    close,
    toggle,
  };
};
