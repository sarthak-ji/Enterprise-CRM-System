// filepath: src/features/reports/RevenueLineChart.jsx
// Monthly Revenue vs Target – Recharts Area/Line Chart.
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
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
          <strong className="text-[var(--color-text-primary)]">
            ${Number(p.value).toLocaleString()}
          </strong>
        </div>
      ))}
    </div>
  );
};

export const RevenueLineChart = () => (
  <div className="ds-card p-5 h-full flex flex-col">
    <div className="mb-4">
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
        Monthly Revenue vs Target
      </h3>
      <p className="text-xs text-[var(--color-text-muted)]">
        Actual revenue performance against set monthly goals
      </p>
    </div>
    <div className="flex-1 min-h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={MONTHLY_REVENUE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
          <Area type="monotone" dataKey="revenue" name="Revenue"
            stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" />
          <Area type="monotone" dataKey="target" name="Target"
            stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#tgtGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);
