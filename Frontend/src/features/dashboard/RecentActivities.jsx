// filepath: src/features/dashboard/RecentActivities.jsx
// Timeline feed of recent CRM activities, deal updates, and team actions.
import { DollarSign, UserPlus, PhoneCall, Mail, CheckCircle2 } from 'lucide-react';
import { mockActivities } from './data/mockDashboardData.js';
import { cn } from '@/utils/cn.js';

export const RecentActivities = () => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'deal':
        return { icon: DollarSign, bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' };
      case 'lead':
        return { icon: UserPlus, bg: 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400' };
      case 'call':
        return { icon: PhoneCall, bg: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400' };
      case 'email':
        return { icon: Mail, bg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400' };
      case 'task':
        return { icon: CheckCircle2, bg: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400' };
      default:
        return { icon: CheckCircle2, bg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' };
    }
  };

  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          Recent Activities
        </h3>
        <p className="text-xs text-[var(--color-text-muted)]">
          Real-time updates from your sales team
        </p>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--color-border)]">
        {mockActivities.map((act) => {
          const { icon: Icon, bg } = getActivityIcon(act.type);
          return (
            <div key={act.id} className="relative flex items-start gap-3 text-xs">
              {/* Timeline marker */}
              <div
                className={cn(
                  'absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-[var(--color-surface-raised)] shrink-0',
                  bg
                )}
              >
                <Icon className="w-3 h-3 stroke-[2.25]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[var(--color-text-primary)] font-medium leading-tight">
                  <span className="font-semibold">{act.user}</span>{' '}
                  <span className="text-[var(--color-text-secondary)]">{act.action}</span>{' '}
                  <span className="font-semibold text-brand-600 dark:text-brand-400">
                    {act.target}
                  </span>
                </p>
                <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5 block">
                  {act.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
