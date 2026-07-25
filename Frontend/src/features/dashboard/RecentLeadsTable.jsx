// filepath: src/features/dashboard/RecentLeadsTable.jsx
// Table displaying recent leads with status badges and quick action links.
import { ArrowRight, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { mockRecentLeads } from './data/mockDashboardData.js';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn.js';

export const RecentLeadsTable = () => {
  const getBadgeStyle = (tone) => {
    switch (tone) {
      case 'success': return 'ds-badge-success';
      case 'warning': return 'ds-badge-warning';
      case 'info':    return 'ds-badge-info';
      case 'brand':   return 'ds-badge-brand';
      default:        return 'ds-badge-neutral';
    }
  };

  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            Recent Leads
          </h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            Latest qualified leads added to the CRM
          </p>
        </div>

        <Link
          to="/leads"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 transition-colors"
        >
          <span>View All Leads</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="ds-table-wrapper border-none shadow-none">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Lead / Company</th>
              <th>Status</th>
              <th>Estimated Value</th>
              <th>Added</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockRecentLeads.map((lead) => (
              <tr key={lead.id} className="group">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {lead.avatar}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-[var(--color-text-primary)] truncate text-sm">
                        {lead.name}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] truncate">
                        {lead.company}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className={cn('ds-badge', getBadgeStyle(lead.statusTone))}>
                    <span className="ds-badge-dot bg-current" />
                    {lead.status}
                  </span>
                </td>

                <td className="font-semibold text-[var(--color-text-primary)] text-sm">
                  {lead.value}
                </td>

                <td className="text-xs text-[var(--color-text-muted)]">
                  {lead.date}
                </td>

                <td className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <a
                      href={`mailto:${lead.email}`}
                      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-brand-600 transition-colors"
                      title="Send email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
