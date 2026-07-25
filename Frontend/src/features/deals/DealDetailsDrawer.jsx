// filepath: src/features/deals/DealDetailsDrawer.jsx
// Deal details slide-over drawer showing full pipeline deal info, probabilities, and quick stage change.
import { useEffect } from 'react';
import {
  X,
  Building2,
  Mail,
  Calendar,
  DollarSign,
  User,
  Target,
  Tag,
  FileText,
  Edit3,
  Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge.jsx';
import { cn } from '@/utils/cn.js';

export const DealDetailsDrawer = ({
  isOpen,
  onClose,
  deal,
  onEdit,
  onDelete,
  onStageChange,
}) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!deal) return null;

  const getPriorityTone = (p) => {
    switch (p?.toLowerCase()) {
      case 'urgent': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'neutral';
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Won': return 'text-emerald-600 dark:text-emerald-400';
      case 'Lost': return 'text-red-600 dark:text-red-400';
      case 'Negotiation': return 'text-purple-600 dark:text-purple-400';
      case 'Proposal': return 'text-amber-600 dark:text-amber-400';
      case 'Qualified': return 'text-cyan-600 dark:text-cyan-400';
      default: return 'text-brand-600 dark:text-brand-400';
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'absolute inset-y-0 right-0 w-full max-w-md bg-[var(--color-surface-raised)] border-l border-[var(--color-border)] shadow-[var(--shadow-2xl)] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                {deal.id}
              </p>
              <h3 className="text-base font-bold text-[var(--color-text-primary)] leading-snug">
                {deal.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                {deal.company}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Badges row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Badge tone={getPriorityTone(deal.priority)} size="sm">
              {deal.priority}
            </Badge>
            <span
              className={cn(
                'text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-surface-sunken)] border border-[var(--color-border)]',
                getStageColor(deal.stage)
              )}
            >
              {deal.stage}
            </span>
            <span className="text-xs font-semibold text-[var(--color-text-muted)] ml-auto">
              P({deal.probability})
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Deal Value Highlight */}
          <div className="p-4 rounded-[var(--radius-card)] bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-brand-950/30 dark:to-indigo-950/30 border border-brand-200 dark:border-brand-900">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500 dark:text-brand-400 mb-1">
              Deal Value
            </p>
            <p className="text-2xl font-extrabold text-brand-700 dark:text-brand-300">
              ${deal.value?.toLocaleString()}
            </p>
          </div>

          {/* Quick Stage Change */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Pipeline Stage
            </h4>
            <div className="flex items-center justify-between gap-3">
              <span className={cn('text-sm font-bold', getStageColor(deal.stage))}>
                {deal.stage}
              </span>
              <select
                value={deal.stage}
                onChange={(e) => onStageChange(deal.id, e.target.value)}
                className="ds-input text-xs h-8 w-auto py-0 px-2 font-medium"
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          {/* Key Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Deal Details
            </h4>

            <div className="space-y-2 text-xs">
              {[
                {
                  icon: User,
                  label: 'Contact',
                  value: deal.contactName || 'N/A',
                  color: 'text-brand-500',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: deal.contactEmail || 'N/A',
                  color: 'text-cyan-500',
                  isLink: deal.contactEmail ? `mailto:${deal.contactEmail}` : null,
                },
                {
                  icon: Calendar,
                  label: 'Expected Close',
                  value: deal.expectedCloseDate,
                  color: 'text-amber-500',
                },
                {
                  icon: Target,
                  label: 'Win Probability',
                  value: deal.probability,
                  color: 'text-emerald-500',
                },
                {
                  icon: Tag,
                  label: 'Deal Owner',
                  value: deal.owner,
                  color: 'text-purple-500',
                },
                {
                  icon: Calendar,
                  label: 'Created Date',
                  value: deal.createdAt,
                  color: 'text-slate-400',
                },
              ].map(({ icon: Icon, label, value, color, isLink }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]"
                >
                  <Icon className={cn('w-4 h-4 shrink-0', color)} />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-[var(--color-text-muted)] block">
                      {label}
                    </span>
                    {isLink ? (
                      <a
                        href={isLink}
                        className="font-medium text-brand-600 hover:underline truncate block"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-semibold text-[var(--color-text-primary)] block">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {deal.notes && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Deal Notes
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] leading-relaxed">
                {deal.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => { onClose(); onDelete(deal); }}
            className="ds-btn ds-btn-danger text-xs h-9 px-3"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
          <button
            type="button"
            onClick={() => { onClose(); onEdit(deal); }}
            className="ds-btn ds-btn-primary text-xs h-9 px-4"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Deal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
