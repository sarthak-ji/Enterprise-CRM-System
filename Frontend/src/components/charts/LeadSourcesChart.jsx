// filepath: src/components/charts/LeadSourcesChart.jsx
// Recharts Donut Pie Chart displaying Lead Sources distribution.
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { mockLeadSources } from '@/features/dashboard/data/mockDashboardData.js';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] p-2.5 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-xs">
        <p className="font-semibold text-[var(--color-text-primary)]">{data.name}</p>
        <p className="text-[var(--color-text-secondary)] mt-0.5">
          Leads: <strong>{data.value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export const LeadSourcesChart = () => {
  const totalLeads = mockLeadSources.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          Lead Sources
        </h3>
        <p className="text-xs text-[var(--color-text-muted)]">
          Acquisition channel breakdown
        </p>
      </div>

      <div className="relative w-full h-56 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockLeadSources}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {mockLeadSources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label inside donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-[var(--color-text-primary)]">
            {totalLeads}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
            Total Leads
          </span>
        </div>
      </div>

      {/* Custom legend */}
      <div className="mt-2 space-y-2">
        {mockLeadSources.map((source) => {
          const percent = Math.round((source.value / totalLeads) * 100);
          return (
            <div key={source.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-[var(--color-text-secondary)] font-medium">
                  {source.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-muted)] font-mono">{source.value}</span>
                <span className="font-semibold text-[var(--color-text-primary)] w-8 text-right">
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadSourcesChart;
