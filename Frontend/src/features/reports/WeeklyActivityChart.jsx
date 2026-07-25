// filepath: src/features/reports/WeeklyActivityChart.jsx
// Weekly Sales Activity – stacked/grouped BarChart for calls, emails, meetings, deals.
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { WEEKLY_ACTIVITY } from './data/mockReportsData.js';

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

export const WeeklyActivityChart = () => (
  <div className="ds-card p-5 h-full flex flex-col">
    <div className="mb-4">
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
        Weekly Sales Activity
      </h3>
      <p className="text-xs text-[var(--color-text-muted)]">
        Calls, emails, meetings, and deals closed per week
      </p>
    </div>
    <div className="flex-1 min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={WEEKLY_ACTIVITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
          <XAxis dataKey="week" tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
          <Bar dataKey="calls" name="Calls" fill="#6366f1" fillOpacity={0.85}
            radius={[4, 4, 0, 0]} maxBarSize={20} stackId="a" />
          <Bar dataKey="emails" name="Emails" fill="#06b6d4" fillOpacity={0.8}
            radius={[4, 4, 0, 0]} maxBarSize={20} stackId="a" />
          <Bar dataKey="meetings" name="Meetings" fill="#10b981" fillOpacity={0.8}
            radius={[4, 4, 0, 0]} maxBarSize={20} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
