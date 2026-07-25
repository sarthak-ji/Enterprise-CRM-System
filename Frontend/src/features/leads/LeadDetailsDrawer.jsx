// filepath: src/features/leads/LeadDetailsDrawer.jsx
// Slide-over Drawer providing in-depth view of a Lead profile, quick status update, contact info, and activity log.
import { useEffect } from 'react';
import { X, Mail, Phone, Building2, Calendar, DollarSign, UserCheck, Edit3, Trash2 } from 'lucide-react';
import { LeadStatusBadge } from './LeadStatusBadge.jsx';
import { LeadPriorityBadge } from './LeadPriorityBadge.jsx';
import { cn } from '@/utils/cn.js';

export const LeadDetailsDrawer = ({
  isOpen,
  onClose,
  lead,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!lead) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Slide-over Drawer panel */}
      <div
        className={cn(
          'absolute inset-y-0 right-0 w-full max-w-lg bg-[var(--color-surface-raised)] border-l border-[var(--color-border)] shadow-[var(--shadow-2xl)] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold text-sm flex items-center justify-center">
              {lead.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                {lead.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                <span>{lead.company}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Actions & Status Bar */}
          <div className="p-4 rounded-[var(--radius-card)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Lead Status
              </span>
              <LeadStatusBadge status={lead.status} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Priority Level
              </span>
              <LeadPriorityBadge priority={lead.priority} />
            </div>

            {/* Quick status dropdown switcher */}
            <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Change Status:
              </span>
              <select
                value={lead.status}
                onChange={(e) => onStatusChange(lead.id, e.target.value)}
                className="ds-input text-xs h-8 w-auto py-0 px-2 font-medium"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          {/* Deal & Financial Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
              <span className="text-[var(--color-text-muted)] block text-[11px] mb-1">
                Estimated Value
              </span>
              <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                ${lead.value?.toLocaleString()}
              </span>
            </div>

            <div className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
              <span className="text-[var(--color-text-muted)] block text-[11px] mb-1">
                Lead Source
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                {lead.source}
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Contact Information
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[var(--color-text-muted)] block">Email</span>
                  <a
                    href={`mailto:${lead.email}`}
                    className="font-medium text-[var(--color-text-primary)] hover:underline truncate block"
                  >
                    {lead.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[var(--color-text-muted)] block">Phone</span>
                  <a
                    href={`tel:${lead.phone}`}
                    className="font-medium text-[var(--color-text-primary)] hover:underline block"
                  >
                    {lead.phone || 'N/A'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[var(--color-text-muted)] block">
                    Assigned Owner
                  </span>
                  <span className="font-semibold text-[var(--color-text-primary)] block">
                    {lead.owner}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[var(--color-text-muted)] block">
                    Created Date
                  </span>
                  <span className="font-medium text-[var(--color-text-primary)] block">
                    {lead.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Notes & Context
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] leading-relaxed">
              {lead.notes || 'No notes added for this lead record yet.'}
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete(lead);
            }}
            className="ds-btn ds-btn-danger text-xs h-9 px-3"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Lead</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(lead);
            }}
            className="ds-btn ds-btn-primary text-xs h-9 px-4"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Lead</span>
          </button>
        </div>
      </div>
    </div>
  );
};
