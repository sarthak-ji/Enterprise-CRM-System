// filepath: src/features/dashboard/PerformanceCards.jsx
// Team & Sales Rep quota performance cards with progress bars and conversion stats.
import { mockPerformanceData } from './data/mockDashboardData.js';
import { Award, TrendingUp, CheckCircle } from 'lucide-react';

export const PerformanceCards = () => {
  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            Sales Rep Performance
          </h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            Monthly quota progress & deal volume
          </p>
        </div>
        <div className="p-2 rounded-[var(--radius-md)] bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <Award className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {mockPerformanceData.map((rep) => (
          <div
            key={rep.id}
            className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                  {rep.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                    {rep.name}
                  </h4>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{rep.role}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 block">
                  {rep.revenue}
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {rep.dealsClosed} deals closed
                </span>
              </div>
            </div>

            {/* Quota Progress */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-medium text-[var(--color-text-secondary)] mb-1">
                <span>Quota Progress</span>
                <span className="font-bold text-[var(--color-text-primary)]">{rep.quotaProgress}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-[var(--color-surface-sunken)] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-300"
                  style={{ width: `${rep.quotaProgress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
