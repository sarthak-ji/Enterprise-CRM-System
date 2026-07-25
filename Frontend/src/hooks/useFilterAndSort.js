// filepath: src/hooks/useFilterAndSort.js
// Generic memoized search, multi-field filtering, and sorting hook for entity collections.
import { useState, useMemo, useCallback } from 'react';

export const useFilterAndSort = ({
  items = [],
  searchKeys = [],
  initialSortBy = 'date-desc',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [sortBy, setSortBy] = useState(initialSortBy);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Search query filtering
    if (searchQuery.trim() && searchKeys.length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const val = item[key];
          return val != null && String(val).toLowerCase().includes(q);
        })
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter((item) => item.priority === priorityFilter);
    }

    // Tier filter
    if (tierFilter !== 'all') {
      result = result.filter((item) => item.tier === tierFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.name || a.company || '').localeCompare(b.name || b.company || '');
        case 'name-desc':
          return (b.name || b.company || '').localeCompare(a.name || a.company || '');
        case 'value-desc':
        case 'spent-desc':
          return (b.value || b.totalSpent || 0) - (a.value || a.totalSpent || 0);
        case 'value-asc':
        case 'spent-asc':
          return (a.value || a.totalSpent || 0) - (b.value || b.totalSpent || 0);
        case 'date-asc':
          return new Date(a.createdAt || a.joinedDate || 0) - new Date(b.createdAt || b.joinedDate || 0);
        case 'date-desc':
        default:
          return new Date(b.createdAt || b.joinedDate || 0) - new Date(a.createdAt || a.joinedDate || 0);
      }
    });

    return result;
  }, [items, searchQuery, searchKeys, statusFilter, priorityFilter, tierFilter, sortBy]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setTierFilter('all');
    setSortBy(initialSortBy);
  }, [initialSortBy]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    tierFilter,
    setTierFilter,
    sortBy,
    setSortBy,
    resetFilters,
    filteredItems: filteredAndSortedItems,
  };
};
