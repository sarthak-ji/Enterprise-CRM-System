// filepath: src/components/forms/FormTextarea.jsx
// Reusable FormTextarea component with label and validation error.
import { forwardRef, memo } from 'react';
import { cn } from '@/utils/cn.js';

export const FormTextarea = memo(
  forwardRef(
    ({ label, error, className, containerClassName, rows = 3, ...props }, ref) => {
      return (
        <div className={cn('space-y-1', containerClassName)}>
          {label && (
            <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)] block">
              {label}
            </label>
          )}

          <textarea
            ref={ref}
            rows={rows}
            className={cn(
              'ds-input text-xs resize-none',
              error && 'ds-input-error',
              className
            )}
            {...props}
          />

          {error && <p className="ds-error text-[11px] font-medium">{error}</p>}
        </div>
      );
    }
  )
);

FormTextarea.displayName = 'FormTextarea';
