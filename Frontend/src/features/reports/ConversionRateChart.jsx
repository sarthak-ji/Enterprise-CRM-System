// filepath: src/features/reports/ConversionRateChart.jsx
// Lead-to-Close Conversion Funnel – Recharts BarChart showing stage drop-off rates.
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { CONVERSION_RATE } from './data/mockReportsData.js';

const COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#a855f7', '#10b981'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] p-3 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-xs space-y-1">
      <p className="font-bold text-[var(--color-text-primary)]">{label}</p>
      <p className="text-[var(--color-text-secondary)]">
        Leads: <strong>{d.leads}</strong>
      </p>
      <p className="text-[var(--color-text-secondary)]">
        Converted: <strong>{d.converted}</strong>
      </p>
      <p className="text-emerald-600 dark:text-emerald-400 font-bold">
        Rate: {d.rate}%
      </p>
    </div>
  );
};

export const ConversionRateChart = () => (
  <div className="ds-card p-5 h-full flex flex-col">
    <div className="mb-4">
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
        Pipeline Conversion Rates
      </h3>
      <p className="text-xs text-[var(--color-text-muted)]">
        Lead counts and stage-to-stage conversion rates
      </p>
    </div>
    <div className="flex-1 min-h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={CONVERSION_RATE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
          <XAxis dataKey="stage" tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} />
          <YAxis tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="leads" name="Total Leads" radius={[6, 6, 0, 0]}>
            {CONVERSION_RATE.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    {/* Stage conversion rates legend */}
    <div className="grid grid-cols-5 gap-1 mt-4 pt-4 border-t border-[var(--color-border)]">
      {CONVERSION_RATE.map((d, i) => (
        <div key={d.stage} className="text-center">
          <div className="text-xs font-bold" style={{ color: COLORS[i] }}>
            {d.rate}%
          </div>
          <div className="text-[10px] text-[var(--color-text-muted)] truncate">{d.stage}</div>
        </div>
      ))}
    </div>
  </div>
);
