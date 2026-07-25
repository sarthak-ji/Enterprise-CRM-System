// filepath: src/components/forms/FormInput.jsx
// Reusable controlled FormInput component integrated with Tailwind styling and error messages.
import { forwardRef, memo } from 'react';
import { cn } from '@/utils/cn.js';

export const FormInput = memo(
  forwardRef(
    (
      {
        label,
        error,
        icon: Icon,
        className,
        containerClassName,
        type = 'text',
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
            <input
              ref={ref}
              type={type}
              className={cn(
                'ds-input text-xs',
                Icon && 'pl-9',
                error && 'ds-input-error',
                className
              )}
              {...props}
            />
          </div>

          {error && <p className="ds-error text-[11px] font-medium">{error}</p>}
        </div>
      );
    }
  )
);

FormInput.displayName = 'FormInput';
