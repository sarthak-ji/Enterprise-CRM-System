// filepath: src/features/reports/ReportsKpiCards.jsx
// Summary KPI cards row for Sales Reports — Revenue, Avg Deal Size, Win Rate, Sales Cycle.
import { DollarSign, BarChart3, Target, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { REPORT_KPIS } from './data/mockReportsData.js';
import { cn } from '@/utils/cn.js';

const cards = [
  {
    id: 'revenue',
    title: 'Total Revenue (YTD)',
    icon: DollarSign,
    iconBg: 'bg-brand-50 text-brand-600 dark:bg-brand-950/80 dark:text-brand-400',
    kpiKey: 'totalRevenue',
  },
  {
    id: 'avgDeal',
    title: 'Avg. Deal Size',
    icon: BarChart3,
    iconBg: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/80 dark:text-cyan-400',
    kpiKey: 'avgDealSize',
  },
  {
    id: 'winRate',
    title: 'Win Rate',
    icon: Target,
    iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400',
    kpiKey: 'winRate',
  },
  {
    id: 'cycle',
    title: 'Avg. Sales Cycle',
    icon: Clock,
    iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/80 dark:text-purple-400',
    kpiKey: 'salesCycle',
  },
];

export const ReportsKpiCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {cards.map(({ id, title, icon: Icon, iconBg, kpiKey }) => {
      const kpi = REPORT_KPIS[kpiKey];
      return (
        <div key={id} className="ds-card p-5 flex flex-col justify-between ds-card-hover group">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {title}
              </p>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1.5 tracking-tight">
                {kpi.value}
              </h3>
            </div>
            <div className={cn('w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110', iconBg)}>
              <Icon className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[11px]',
              kpi.isPositive
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300'
            )}>
              {kpi.isPositive
                ? <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                : <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />}
              {kpi.change}
            </span>
            <span className="text-[11px] text-[var(--color-text-muted)] ml-2 font-medium">
              vs last period
            </span>
          </div>
        </div>
      );
    })}
  </div>
);
