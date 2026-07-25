// filepath: src/components/charts/MonthlyRevenueChart.jsx
// Interactive Monthly Revenue Area/Bar Chart built with Recharts.
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { mockRevenueData } from '@/features/dashboard/data/mockDashboardData.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] p-3 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-xs">
        <p className="font-semibold text-[var(--color-text-primary)] mb-1.5">{label}</p>
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
          <span>Revenue: <strong>${payload[0].value.toLocaleString()}</strong></span>
        </div>
        {payload[1] && (
          <div className="flex items-center gap-2 text-[var(--color-text-muted)] mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Target: <strong>${payload[1].value.toLocaleString()}</strong></span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const MonthlyRevenueChart = () => {
  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            Monthly Revenue Trend
          </h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            Comparison of actual revenue vs target goals
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-brand-500" />
            <span className="text-[var(--color-text-secondary)]">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-400" />
            <span className="text-[var(--color-text-muted)]">Target</span>
          </div>
        </div>
      </div>

      <div className="w-full h-72 min-h-[280px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
              tickFormatter={(val) => `$${val / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#revenueGrad)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#94a3b8"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#targetGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;
