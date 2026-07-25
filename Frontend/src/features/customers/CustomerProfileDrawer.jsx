// filepath: src/features/customers/CustomerProfileDrawer.jsx
// Detailed Customer Profile slide-over drawer with tabs: Profile Overview, Notes, Activity Timeline, and Financials.
import { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  UserCheck,
  DollarSign,
  Briefcase,
  FileText,
  Clock,
  Send,
  Edit3,
  Trash2,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { CustomerStatusBadge } from './CustomerStatusBadge.jsx';
import { CustomerTierBadge } from './CustomerTierBadge.jsx';
import { cn } from '@/utils/cn.js';

export const CustomerProfileDrawer = ({
  isOpen,
  onClose,
  customer,
  onEdit,
  onDelete,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'notes' | 'timeline'
  const [newNoteText, setNewNoteText] = useState('');

  // Reset tab on customer change
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
      setNewNoteText('');
    }
  }, [isOpen, customer]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!customer) return null;

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(customer.id, newNoteText.trim());
    setNewNoteText('');
  };

  const initials = customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

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

      {/* Slide-over Drawer Panel */}
      <div
        className={cn(
          'absolute inset-y-0 right-0 w-full max-w-xl bg-[var(--color-surface-raised)] border-l border-[var(--color-border)] shadow-[var(--shadow-2xl)] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-base flex items-center justify-center shadow-md">
                {initials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">
                  {customer.company}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Contact: <span className="font-semibold text-[var(--color-text-primary)]">{customer.name}</span>
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

          {/* Badges & Metrics Row */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[var(--color-border)]">
            <CustomerStatusBadge status={customer.status} />
            <CustomerTierBadge tier={customer.tier} />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
              ${customer.totalSpent?.toLocaleString()} LTV
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 mt-5 border-b border-[var(--color-border)] -mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={cn(
                'px-4 py-2 text-xs font-semibold border-b-2 transition-colors',
                activeTab === 'overview'
                  ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              )}
            >
              Overview & Contact
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('notes')}
              className={cn(
                'px-4 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5',
                activeTab === 'notes'
                  ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              )}
            >
              <span>Notes</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                {customer.notes?.length || 0}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={cn(
                'px-4 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5',
                activeTab === 'timeline'
                  ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              )}
            >
              <span>Timeline</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[var(--color-surface-sunken)] text-[var(--color-text-muted)]">
                {customer.timeline?.length || 0}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: OVERVIEW & CONTACT */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Account Overview Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                  <span className="text-[var(--color-text-muted)] text-[11px] block mb-1">
                    Industry
                  </span>
                  <span className="font-semibold text-[var(--color-text-primary)] text-sm">
                    {customer.industry || 'Enterprise'}
                  </span>
                </div>

                <div className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                  <span className="text-[var(--color-text-muted)] text-[11px] block mb-1">
                    Company Size
                  </span>
                  <span className="font-semibold text-[var(--color-text-primary)] text-sm">
                    {customer.companySize || '50+ employees'}
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
                        href={`mailto:${customer.email}`}
                        className="font-medium text-[var(--color-text-primary)] hover:underline truncate block"
                      >
                        {customer.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                    <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-[var(--color-text-muted)] block">Phone</span>
                      <a
                        href={`tel:${customer.phone}`}
                        className="font-medium text-[var(--color-text-primary)] hover:underline block"
                      >
                        {customer.phone || 'N/A'}
                      </a>
                    </div>
                  </div>

                  {customer.website && (
                    <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                      <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] text-[var(--color-text-muted)] block">Website</span>
                        <a
                          href={customer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-brand-600 hover:underline truncate block"
                        >
                          {customer.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {customer.address && (
                    <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] text-[var(--color-text-muted)] block">Address</span>
                        <span className="font-medium text-[var(--color-text-primary)] block">
                          {customer.address}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                    <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-[var(--color-text-muted)] block">
                        Account Manager
                      </span>
                      <span className="font-semibold text-[var(--color-text-primary)] block">
                        {customer.accountManager}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                    <Calendar className="w-4 h-4 text-purple-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-[var(--color-text-muted)] block">
                        Customer Since
                      </span>
                      <span className="font-medium text-[var(--color-text-primary)] block">
                        {customer.joinedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4 animate-fade-in">
              {/* Add Note Input */}
              <form onSubmit={handleAddNoteSubmit} className="space-y-2">
                <textarea
                  rows={3}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Type a new customer update or interaction note..."
                  className="ds-input text-xs resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newNoteText.trim()}
                    className="ds-btn ds-btn-primary text-xs h-8 px-3"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Add Note</span>
                  </button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-3 pt-2">
                {customer.notes?.length === 0 ? (
                  <p className="text-xs text-center py-8 text-[var(--color-text-muted)]">
                    No notes recorded yet for this customer.
                  </p>
                ) : (
                  customer.notes?.map((n) => (
                    <div
                      key={n.id}
                      className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-brand-600 dark:text-brand-400">
                          {n.author}
                        </span>
                        <span className="text-[var(--color-text-muted)]">{n.date}</span>
                      </div>
                      <p className="text-[var(--color-text-primary)] leading-relaxed">{n.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TIMELINE FEED */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 animate-fade-in">
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--color-border)]">
                {customer.timeline?.length === 0 ? (
                  <p className="text-xs text-[var(--color-text-muted)]">No timeline events recorded.</p>
                ) : (
                  customer.timeline?.map((evt) => (
                    <div key={evt.id} className="relative flex items-start gap-3 text-xs">
                      {/* Timeline dot */}
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center ring-4 ring-[var(--color-surface-raised)] shrink-0">
                        <Clock className="w-3 h-3" />
                      </div>

                      <div className="flex-1 min-w-0 p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-bold text-[var(--color-text-primary)] text-xs">
                            {evt.title}
                          </h5>
                          <span className="text-[10px] text-[var(--color-text-muted)] shrink-0">
                            {evt.date}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">
                          {evt.description}
                        </p>
                        <span className="text-[10px] text-[var(--color-text-muted)] mt-1.5 block italic">
                          By {evt.actor}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete(customer);
            }}
            className="ds-btn ds-btn-danger text-xs h-9 px-3"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Customer</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(customer);
            }}
            className="ds-btn ds-btn-primary text-xs h-9 px-4"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
