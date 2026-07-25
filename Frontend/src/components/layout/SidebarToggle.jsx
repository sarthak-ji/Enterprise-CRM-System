// filepath: src/components/layout/SidebarToggle.jsx
// Reusable chevron button that lives at the bottom of the desktop sidebar.
// On mobile, the Topbar renders a hamburger that calls toggleMobile() instead.
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext.jsx';
import { cn } from '@/utils/cn.js';

export const SidebarToggle = ({ className }) => {
  const { isCollapsed, toggleCollapsed } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggleCollapsed}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-full',
        'bg-[var(--color-surface)] border border-[var(--color-border)]',
        'text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)]',
        'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-700)] hover:border-[var(--color-brand-200)]',
        'hover:scale-110 active:scale-95',
        'focus-visible:shadow-[var(--shadow-ring)]',
        className,
      )}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!isCollapsed}
    >
      {isCollapsed
        ? <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
        : <ChevronLeft  className="w-4 h-4" strokeWidth={2.5} />}
    </button>
  );
};
