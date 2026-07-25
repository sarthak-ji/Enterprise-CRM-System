// filepath: src/features/reports/LeadSourcePieChart.jsx
// Lead Sources Distribution – Recharts Donut PieChart with legend.
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { LEAD_SOURCES } from './data/mockReportsData.js';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] p-2.5 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-xs">
      <p className="font-bold text-[var(--color-text-primary)]">{d.name}</p>
      <p className="text-[var(--color-text-secondary)] mt-0.5">
        Leads: <strong>{d.value}</strong>
      </p>
    </div>
  );
};

export const LeadSourcePieChart = () => {
  const total = LEAD_SOURCES.reduce((acc, s) => acc + s.value, 0);
  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          Lead Source Distribution
        </h3>
        <p className="text-xs text-[var(--color-text-muted)]">
          Acquisition channel breakdown (total: {total} leads)
        </p>
      </div>

      {/* Donut Chart */}
      <div className="relative w-full h-52 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={LEAD_SOURCES} cx="50%" cy="50%"
              innerRadius={58} outerRadius={82} paddingAngle={4} dataKey="value">
              {LEAD_SOURCES.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-[var(--color-text-primary)]">{total}</span>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Leads</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-2">
        {LEAD_SOURCES.map((s) => (
          <div key={s.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-[var(--color-text-secondary)]">{s.name}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-[var(--color-text-muted)] font-mono">{s.value}</span>
              <span className="text-[var(--color-text-primary)] w-9 text-right">
                {Math.round((s.value / total) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
