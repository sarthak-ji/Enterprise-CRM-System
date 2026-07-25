// filepath: src/features/leads/LeadFilters.jsx
// Control bar containing search, status filter, priority filter, sorting, and reset controls.
import { Search, Filter, RotateCcw, X } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const LeadFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  totalResults = 0,
}) => {
  const hasActiveFilters = searchQuery || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="ds-card p-4 space-y-3 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search leads by name, company, email..."
            className="ds-input pl-9 pr-8 text-xs h-9"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="ds-input text-xs h-9 w-auto min-w-[130px]"
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="ds-input text-xs h-9 w-auto min-w-[130px]"
          >
            <option value="all">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="ds-input text-xs h-9 w-auto min-w-[150px]"
          >
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="name-desc">Sort: Name (Z-A)</option>
            <option value="value-desc">Sort: Value (High to Low)</option>
            <option value="value-asc">Sort: Value (Low to High)</option>
            <option value="date-desc">Sort: Date (Newest)</option>
            <option value="date-asc">Sort: Date (Oldest)</option>
          </select>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="ds-btn ds-btn-ghost text-xs h-9 px-2.5 text-[var(--color-text-muted)] hover:text-brand-600"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
