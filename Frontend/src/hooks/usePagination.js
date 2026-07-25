// filepath: src/hooks/usePagination.js
// Custom hook for managing table/list pagination state and slicing items cleanly.
import { useState, useMemo, useCallback } from 'react';
import { PAGINATION_DEFAULTS } from '@/constants/app.constants.js';

export const usePagination = (items = [], initialPageSize = PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Reset page to 1 if items change and current page exceeds total pages
  const validPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (validPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, validPage, pageSize]);

  const changePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const changePageSize = useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  return {
    currentPage: validPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedItems,
    changePage,
    changePageSize,
  };
};
