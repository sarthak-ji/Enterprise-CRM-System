// filepath: src/components/ui/Badge.jsx
// Reusable status & metadata Badge component supporting semantic color tones.
import { memo } from 'react';
import { cn } from '@/utils/cn.js';

export const Badge = memo(
  ({
    children,
    tone = 'neutral', // 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    dot = false,
    size = 'md', // 'sm' | 'md'
    className,
  }) => {
    const toneClasses = {
      brand: 'ds-badge-brand',
      success: 'ds-badge-success',
      warning: 'ds-badge-warning',
      danger: 'ds-badge-danger',
      info: 'ds-badge-info',
      neutral: 'ds-badge-neutral',
    }[tone];

    const sizeClasses = {
      sm: 'text-[10px] px-1.5 py-0.5',
      md: 'text-xs px-2.5 py-1',
    }[size];

    return (
      <span
        className={cn(
          'ds-badge font-semibold select-none',
          toneClasses,
          sizeClasses,
          className
        )}
      >
        {dot && <span className="ds-badge-dot bg-current" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
