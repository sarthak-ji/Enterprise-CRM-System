// filepath: src/features/customers/CustomerFilters.jsx
// Control bar for Customer Management (Search, Status Filter, Tier Filter, Sorting, Reset).
import { Search, RotateCcw, X } from 'lucide-react';

export const CustomerFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  tierFilter,
  onTierFilterChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  totalResults = 0,
}) => {
  const hasActiveFilters = searchQuery || statusFilter !== 'all' || tierFilter !== 'all';

  return (
    <div className="ds-card p-4 space-y-3 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search customers by name, company, email..."
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
            <option value="Active">Active</option>
            <option value="At-Risk">At-Risk</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => onTierFilterChange(e.target.value)}
            className="ds-input text-xs h-9 w-auto min-w-[130px]"
          >
            <option value="all">All Tiers</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Professional">Professional</option>
            <option value="Starter">Starter</option>
          </select>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="ds-input text-xs h-9 w-auto min-w-[160px]"
          >
            <option value="spent-desc">Sort: Spent (High to Low)</option>
            <option value="spent-asc">Sort: Spent (Low to High)</option>
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="name-desc">Sort: Name (Z-A)</option>
            <option value="date-desc">Sort: Joined (Newest)</option>
            <option value="date-asc">Sort: Joined (Oldest)</option>
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
