// filepath: src/features/customers/CustomerTable.jsx
// Table displaying Customer accounts with status & tier badges, sorting, selection, and row actions.
import { CustomerStatusBadge } from './CustomerStatusBadge.jsx';
import { CustomerTierBadge } from './CustomerTierBadge.jsx';
import { ArrowUpDown, Eye, Edit3, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const CustomerTable = ({
  customers = [],
  sortBy,
  onSortToggle,
  onViewProfile,
  onEditCustomer,
  onDeleteCustomer,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
}) => {
  const isAllSelected = customers.length > 0 && selectedIds.length === customers.length;

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
                aria-label="Select all customers"
              />
            </th>

            <th
              onClick={() => onSortToggle('name')}
              className="cursor-pointer select-none hover:text-[var(--color-text-primary)]"
            >
              <div className="flex items-center gap-1.5">
                <span>Customer / Organization</span>
                <ArrowUpDown className="w-3 h-3 text-[var(--color-text-muted)]" />
              </div>
            </th>

            <th>Primary Contact</th>

            <th
              onClick={() => onSortToggle('tier')}
              className="cursor-pointer select-none hover:text-[var(--color-text-primary)]"
            >
              <div className="flex items-center gap-1.5">
                <span>Plan Tier</span>
                <ArrowUpDown className="w-3 h-3 text-[var(--color-text-muted)]" />
              </div>
            </th>

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
              onClick={() => onSortToggle('spent')}
              className="cursor-pointer select-none hover:text-[var(--color-text-primary)]"
            >
              <div className="flex items-center gap-1.5">
                <span>Lifetime Value (LTV)</span>
                <ArrowUpDown className="w-3 h-3 text-[var(--color-text-muted)]" />
              </div>
            </th>

            <th>Account Manager</th>

            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-[var(--color-text-muted)]">
                <p className="text-sm font-semibold">No customer accounts found matching your filters</p>
                <p className="text-xs mt-1">Try searching with a different term or reset filters</p>
              </td>
            </tr>
          ) : (
            customers.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              const initials = c.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <tr
                  key={c.id}
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
                      onChange={() => onToggleSelect(c.id)}
                      className="w-4 h-4 rounded border-[var(--color-border)] text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </td>

                  {/* Company & Name */}
                  <td>
                    <div
                      onClick={() => onViewProfile(c)}
                      className="flex items-center gap-3 cursor-pointer group/name"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm group-hover/name:text-brand-600 transition-colors truncate">
                          {c.company}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] truncate flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {c.industry || 'Enterprise'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td>
                    <div className="flex flex-col text-xs text-[var(--color-text-secondary)]">
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        {c.name}
                      </span>
                      <span className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {c.email}
                      </span>
                    </div>
                  </td>

                  {/* Tier */}
                  <td>
                    <CustomerTierBadge tier={c.tier} />
                  </td>

                  {/* Status */}
                  <td>
                    <CustomerStatusBadge status={c.status} />
                  </td>

                  {/* LTV */}
                  <td className="font-bold text-sm text-[var(--color-text-primary)]">
                    ${c.totalSpent?.toLocaleString()}
                  </td>

                  {/* Account Manager */}
                  <td className="text-xs font-medium text-[var(--color-text-secondary)]">
                    {c.accountManager}
                  </td>

                  {/* Row Actions */}
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onViewProfile(c)}
                        className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-brand-600 transition-colors"
                        title="View profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditCustomer(c)}
                        className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-brand-600 transition-colors"
                        title="Edit customer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteCustomer(c)}
                        className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-red-600 transition-colors"
                        title="Delete customer"
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
