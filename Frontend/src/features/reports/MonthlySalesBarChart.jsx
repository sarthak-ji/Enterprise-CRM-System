// filepath: src/features/reports/MonthlySalesBarChart.jsx
// Monthly Sales Activity – grouped BarChart for deals closed and weekly activity.
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { MONTHLY_REVENUE } from './data/mockReportsData.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] p-3 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-xs space-y-1.5">
      <p className="font-bold text-[var(--color-text-primary)]">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[var(--color-text-secondary)]">{p.name}:</span>
          <strong className="text-[var(--color-text-primary)]">{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export const MonthlySalesBarChart = () => (
  <div className="ds-card p-5 h-full flex flex-col">
    <div className="mb-4">
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
        Monthly Sales Volume
      </h3>
      <p className="text-xs text-[var(--color-text-muted)]">
        Number of deals closed each month vs revenue (in thousands)
      </p>
    </div>
    <div className="flex-1 min-h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={MONTHLY_REVENUE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <YAxis yAxisId="left" tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            tickFormatter={(v) => `$${v / 1000}k`} />
          <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
          <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)"
            fill="#6366f1" fillOpacity={0.85} radius={[6, 6, 0, 0]} maxBarSize={36} />
          <Bar yAxisId="right" dataKey="deals" name="Deals Closed"
            fill="#06b6d4" fillOpacity={0.8} radius={[6, 6, 0, 0]} maxBarSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
