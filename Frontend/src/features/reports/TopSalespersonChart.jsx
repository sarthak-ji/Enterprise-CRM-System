// filepath: src/features/reports/TopSalespersonChart.jsx
// Top Salesperson performance – horizontal BarChart with quota progress.
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { TOP_SALESPEOPLE } from './data/mockReportsData.js';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] p-3 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-xs space-y-1">
      <p className="font-bold text-[var(--color-text-primary)]">{d.name}</p>
      <p className="text-[var(--color-text-secondary)]">
        Revenue: <strong className="text-brand-600">${d.revenue.toLocaleString()}</strong>
      </p>
      <p className="text-[var(--color-text-secondary)]">
        Deals Closed: <strong>{d.deals}</strong>
      </p>
      <p className="text-[var(--color-text-secondary)]">
        Quota: <strong>{d.quota}%</strong>
      </p>
    </div>
  );
};

export const TopSalespersonChart = () => (
  <div className="ds-card p-5 h-full flex flex-col">
    <div className="mb-4">
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
        Top Sales Representatives
      </h3>
      <p className="text-xs text-[var(--color-text-muted)]">
        Revenue generated and quota attainment by sales rep
      </p>
    </div>

    <div className="flex-1 min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={TOP_SALESPEOPLE}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
          <XAxis type="number" tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
            tickFormatter={(v) => `$${v / 1000}k`} />
          <YAxis type="category" dataKey="name" tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-primary)', fontSize: 12, fontWeight: 600 }}
            width={110} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="revenue" radius={[0, 6, 6, 0]} maxBarSize={24}>
            {TOP_SALESPEOPLE.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Quota progress row */}
    <div className="mt-4 pt-4 border-t border-[var(--color-border)] space-y-2.5">
      {TOP_SALESPEOPLE.map((rep, i) => (
        <div key={rep.name}>
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                style={{ backgroundColor: COLORS[i] }}>
                {rep.avatar}
              </div>
              <span className="font-semibold text-[var(--color-text-primary)]">{rep.name}</span>
            </div>
            <span className="font-bold text-[var(--color-text-primary)]">{rep.quota}% quota</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-sunken)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${rep.quota}%`, backgroundColor: COLORS[i] }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
