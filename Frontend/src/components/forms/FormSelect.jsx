// filepath: src/components/forms/FormSelect.jsx
// Reusable FormSelect component with options list and validation handling.
import { forwardRef, memo } from 'react';
import { cn } from '@/utils/cn.js';

export const FormSelect = memo(
  forwardRef(
    (
      {
        label,
        error,
        options = [],
        icon: Icon,
        className,
        containerClassName,
        children,
        ...props
      },
      ref
    ) => {
      return (
        <div className={cn('space-y-1', containerClassName)}>
          {label && (
            <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)] block">
              {label}
            </label>
          )}

          <div className="relative">
            {Icon && (
              <Icon className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2 shrink-0 pointer-events-none" />
            )}
            <select
              ref={ref}
              className={cn(
                'ds-input text-xs',
                Icon && 'pl-9',
                error && 'ds-input-error',
                className
              )}
              {...props}
            >
              {children
                ? children
                : options.map((opt) => {
                    const value = typeof opt === 'object' ? opt.value : opt;
                    const labelStr = typeof opt === 'object' ? opt.label : opt;
                    return (
                      <option key={value} value={value}>
                        {labelStr}
                      </option>
                    );
                  })}
            </select>
          </div>

          {error && <p className="ds-error text-[11px] font-medium">{error}</p>}
        </div>
      );
    }
  )
);

FormSelect.displayName = 'FormSelect';
