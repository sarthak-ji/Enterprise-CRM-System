// filepath: src/features/dashboard/KpiCards.jsx
// Grid of 4 primary CRM KPI cards: Revenue, Leads, Deals, Customers.
import { DollarSign, Users, Briefcase, UserCheck, TrendingUp, ArrowUpRight } from 'lucide-react';
import { mockKpiData } from './data/mockDashboardData.js';
import { cn } from '@/utils/cn.js';

export const KpiCards = () => {
  const cards = [
    {
      id: 'revenue',
      title: 'Revenue',
      value: mockKpiData.revenue.value,
      change: mockKpiData.revenue.change,
      subtitle: `Target: ${mockKpiData.revenue.target}`,
      icon: DollarSign,
      iconBg: 'bg-brand-50 text-brand-600 dark:bg-brand-950/80 dark:text-brand-400',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      id: 'leads',
      title: 'Leads',
      value: mockKpiData.leads.value,
      change: mockKpiData.leads.change,
      subtitle: `Target: ${mockKpiData.leads.target}`,
      icon: Users,
      iconBg: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/80 dark:text-cyan-400',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      id: 'deals',
      title: 'Active Deals',
      value: mockKpiData.deals.value,
      change: mockKpiData.deals.change,
      subtitle: `Pipeline: ${mockKpiData.deals.pipelineValue}`,
      icon: Briefcase,
      iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      id: 'customers',
      title: 'Customers',
      value: mockKpiData.customers.value,
      change: mockKpiData.customers.change,
      subtitle: `Retention: ${mockKpiData.customers.retentionRate}`,
      icon: UserCheck,
      iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="ds-card p-5 flex flex-col justify-between ds-card-hover group relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1.5 tracking-tight">
                  {card.value}
                </h3>
              </div>

              <div
                className={cn(
                  'w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110',
                  card.iconBg
                )}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--color-border)] text-xs">
              <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[11px]', card.badgeBg)}>
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                {card.change}
              </span>
              <span className="text-[var(--color-text-muted)] font-medium">
                {card.subtitle}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
