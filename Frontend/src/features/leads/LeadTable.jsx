// filepath: src/features/leads/LeadTable.jsx
// Full featured Lead Table component supporting row selection, column sorting, status badges, and action handlers.
import { useState } from 'react';
import { LeadStatusBadge } from './LeadStatusBadge.jsx';
import { LeadPriorityBadge } from './LeadPriorityBadge.jsx';
import { ArrowUpDown, Eye, Edit3, Trash2, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const LeadTable = ({
  leads = [],
  sortBy,
  onSortToggle,
  onViewDetails,
  onEditLead,
  onDeleteLead,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
}) => {
  const isAllSelected = leads.length > 0 && selectedIds.length === leads.length;

  return (
    <div className="ds-table-wrapper">
      <table className="ds-table">
        <thead>
          <tr>
            <th className="w-10 text-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onToggleSelectAll}
                className="w-4 h-4 rounded border-[var(--color-border)] text-brand-600 focus:ring-brand-500 cursor-pointer"
                aria-label="Select all leads"
              />
            </th>

            <th
              onClick={() => onSortToggle('name')}
              className="cursor-pointer select-none hover:text-[var(--color-text-primary)]"
            >
              <div className="flex items-center gap-1.5">
                <span>Lead / Company</span>
                <ArrowUpDown className="w-3 h-3 text-[var(--color-text-muted)]" />
              </div>
            </th>

            <th>Contact Info</th>

            <th
              onClick={() => onSortToggle('status')}
              className="cursor-pointer select-none hover:text-[var(--color-text-primary)]"
            >
              <div className="flex items-center gap-1.5">
                <span>Status</span>
                <ArrowUpDown className="w-3 h-3 text-[var(--color-text-muted)]" />
              </div>
            </th>

            <th
              onClick={() => onSortToggle('priority')}
              className="cursor-pointer select-none hover:text-[var(--color-text-primary)]"
            >
              <div className="flex items-center gap-1.5">
                <span>Priority</span>
                <ArrowUpDown className="w-3 h-3 text-[var(--color-text-muted)]" />
              </div>
            </th>

            <th
              onClick={() => onSortToggle('value')}
              className="cursor-pointer select-none hover:text-[var(--color-text-primary)]"
            >
              <div className="flex items-center gap-1.5">
                <span>Est. Value</span>
                <ArrowUpDown className="w-3 h-3 text-[var(--color-text-muted)]" />
              </div>
            </th>

            <th>Sales Owner</th>

            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-[var(--color-text-muted)]">
                <p className="text-sm font-semibold">No leads found matching your criteria</p>
                <p className="text-xs mt-1">Try resetting your filters or search query</p>
              </td>
            </tr>
          ) : (
            leads.map((lead) => {
              const isSelected = selectedIds.includes(lead.id);
              const initials = lead.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <tr
                  key={lead.id}
                  className={cn(
                    'group transition-colors',
                    isSelected && 'bg-brand-50/50 dark:bg-brand-950/20'
                  )}
                >
                  {/* Checkbox */}
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(lead.id)}
                      className="w-4 h-4 rounded border-[var(--color-border)] text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </td>

                  {/* Name & Company */}
                  <td>
                    <div
                      onClick={() => onViewDetails(lead)}
                      className="flex items-center gap-3 cursor-pointer group/name"
                    >
                      <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm group-hover/name:text-brand-600 transition-colors truncate">
                          {lead.name}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] truncate">
                          {lead.company}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td>
                    <div className="flex flex-col text-xs text-[var(--color-text-secondary)]">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[var(--color-text-muted)]" />
                        {lead.email}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)] mt-0.5">
                        <Phone className="w-3 h-3" />
                        {lead.phone || 'N/A'}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <LeadStatusBadge status={lead.status} />
                  </td>

                  {/* Priority */}
                  <td>
                    <LeadPriorityBadge priority={lead.priority} />
                  </td>

                  {/* Estimated Value */}
                  <td className="font-bold text-sm text-[var(--color-text-primary)]">
                    ${lead.value?.toLocaleString()}
                  </td>

                  {/* Owner */}
                  <td className="text-xs font-medium text-[var(--color-text-secondary)]">
                    {lead.owner}
                  </td>

                  {/* Action buttons */}
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onViewDetails(lead)}
                        className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-brand-600 transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditLead(lead)}
                        className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-brand-600 transition-colors"
                        title="Edit lead"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteLead(lead)}
                        className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-red-600 transition-colors"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
