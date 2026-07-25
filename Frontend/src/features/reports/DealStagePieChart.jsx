// filepath: src/features/reports/DealStagePieChart.jsx
// Deal Stage Distribution Donut – how deals are spread across pipeline stages.
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { DEAL_STAGE_DISTRIBUTION } from './data/mockReportsData.js';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] p-2.5 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-xs">
      <p className="font-bold text-[var(--color-text-primary)]">{d.name}</p>
      <p className="text-[var(--color-text-secondary)] mt-0.5">
        Deals: <strong>{d.value}</strong>
      </p>
    </div>
  );
};

export const DealStagePieChart = () => {
  const total = DEAL_STAGE_DISTRIBUTION.reduce((acc, d) => acc + d.value, 0);
  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          Deal Stage Distribution
        </h3>
        <p className="text-xs text-[var(--color-text-muted)]">
          Active deal volume across all pipeline stages
        </p>
      </div>

      <div className="relative w-full h-52 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={DEAL_STAGE_DISTRIBUTION} cx="50%" cy="50%"
              innerRadius={58} outerRadius={82} paddingAngle={4} dataKey="value">
              {DEAL_STAGE_DISTRIBUTION.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-[var(--color-text-primary)]">{total}</span>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Deals</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4">
        {DEAL_STAGE_DISTRIBUTION.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-[var(--color-text-secondary)]">{d.name}</span>
            </div>
            <span className="font-bold text-[var(--color-text-primary)]">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
