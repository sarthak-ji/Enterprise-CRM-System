// filepath: src/components/ui/Pagination.jsx
// Reusable Pagination component with page controls, total items indicator, and page size selection.
import { memo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const Pagination = memo(
  ({
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    pageSize = 10,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50],
  }) => {
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface-raised)] text-xs select-none">
        {/* Item info */}
        <div className="text-[var(--color-text-muted)] font-medium text-center sm:text-left">
          Showing <span className="font-semibold text-[var(--color-text-primary)]">{startItem}</span> to{' '}
          <span className="font-semibold text-[var(--color-text-primary)]">{endItem}</span> of{' '}
          <span className="font-semibold text-[var(--color-text-primary)]">{totalItems}</span> entries
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          {/* Page size selector */}
          {onPageSizeChange && (
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-text-muted)]">Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="ds-input py-1 px-2 text-xs w-auto h-8 border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Page Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="First page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 text-xs font-semibold text-[var(--color-text-primary)]">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Last page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
