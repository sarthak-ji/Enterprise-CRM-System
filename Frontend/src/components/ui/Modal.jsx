// filepath: src/components/ui/Modal.jsx
// Reusable accessible Modal dialog component with backdrop blur, Escape key closing, and size variants.
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  children,
  footer,
}) => {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full rounded-[var(--radius-card)] bg-[var(--color-surface-raised)] border border-[var(--color-border)] shadow-[var(--shadow-2xl)] z-10 overflow-hidden flex flex-col my-auto animate-scale-in',
          sizeClasses
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
