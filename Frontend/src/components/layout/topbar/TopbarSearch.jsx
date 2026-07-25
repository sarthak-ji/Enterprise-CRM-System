// filepath: src/components/layout/topbar/TopbarSearch.jsx
// Global search bar with Ctrl+K shortcut hint. Expandable on mobile.
import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const TopbarSearch = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef(null);

  // Ctrl+K / Cmd+K keyboard shortcut to focus search
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setMobileOpen(true);
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  return (
    <>
      {/* Mobile search toggle */}
      <button
        type="button"
        onClick={() => { setMobileOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }}
        className={cn(
          'md:hidden flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]',
          'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]',
          'transition-colors',
        )}
        aria-label="Search"
      >
        <Search className="w-[18px] h-[18px]" strokeWidth={2} />
      </button>

      {/* Desktop search bar + Mobile overlay */}
      <div
        className={cn(
          // Desktop: inline
          'hidden md:flex items-center relative',
          // Mobile: full-screen overlay when open
          isMobileOpen && '!flex fixed inset-0 z-50 bg-[var(--color-surface-raised)] md:relative md:inset-auto md:z-auto md:bg-transparent p-4 md:p-0',
        )}
      >
        {/* Mobile close button */}
        {isMobileOpen && (
          <button
            type="button"
            onClick={() => { setMobileOpen(false); setQuery(''); }}
            className="md:hidden mr-3 flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        )}

        <div
          className={cn(
            'flex items-center gap-2 w-full md:w-64 lg:w-80 h-9 px-3',
            'rounded-[var(--radius-lg)] border',
            'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
            isFocused
              ? 'border-[var(--color-brand-400)] bg-[var(--color-surface)] shadow-[var(--shadow-ring)]'
              : 'border-[var(--color-border)] bg-[var(--color-surface-sunken)] hover:border-[var(--color-border-strong)]',
          )}
        >
          <Search
            className={cn(
              'w-4 h-4 shrink-0 transition-colors duration-200',
              isFocused ? 'text-[var(--color-brand-500)]' : 'text-[var(--color-text-muted)]',
            )}
            strokeWidth={2}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search CRM..."
            className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none min-w-0"
            aria-label="Search CRM"
          />
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          ) : (
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 h-5 rounded-[var(--radius-xs)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-[10px] font-medium text-[var(--color-text-muted)] select-none shrink-0">
              ⌘K
            </kbd>
          )}
        </div>
      </div>
    </>
  );
};
