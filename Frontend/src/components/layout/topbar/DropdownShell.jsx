// filepath: src/components/layout/topbar/DropdownShell.jsx
// Reusable positioned dropdown container with click-outside closing, animation,
// and an optional header/footer. Used by Notifications, Messages, and Profile dropdowns.
import { useRef, useEffect } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside.js';
import { cn } from '@/utils/cn.js';

export const DropdownShell = ({
  isOpen,
  onClose,
  trigger,
  align = 'right',    // 'left' | 'right' | 'center'
  width = 'w-80',
  className,
  children,
}) => {
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => { if (isOpen) onClose(); });

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const alignClass = {
    right: 'right-0',
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
  }[align];

  return (
    <div ref={containerRef} className="relative">
      {trigger}

      <div
        className={cn(
          'absolute top-full mt-2 z-50',
          alignClass,
          width,
          'rounded-[var(--radius-lg)] border border-[var(--color-border)]',
          'bg-[var(--color-surface-raised)] shadow-[var(--shadow-xl)]',
          'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top',
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none',
          className,
        )}
        role="menu"
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
};

/** Reusable dropdown header */
export const DropdownHeader = ({ title, action, children }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
    {action && (
      <button
        type="button"
        onClick={action.onClick}
        className="text-xs font-medium text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] transition-colors"
      >
        {action.label}
      </button>
    )}
    {children}
  </div>
);

/** Reusable dropdown footer */
export const DropdownFooter = ({ children, className }) => (
  <div className={cn('px-4 py-2.5 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] rounded-b-[var(--radius-lg)]', className)}>
    {children}
  </div>
);

/** Empty state for dropdowns */
export const DropdownEmpty = ({ icon: Icon, message }) => (
  <div className="flex flex-col items-center justify-center py-8 gap-2">
    {Icon && <Icon className="w-8 h-8 text-[var(--color-text-muted)] opacity-50" strokeWidth={1.5} />}
    <p className="text-xs text-[var(--color-text-muted)]">{message}</p>
  </div>
);
