// filepath: src/features/dashboard/PipelineSummary.jsx
// Visual summary of Sales Pipeline stages, active deal counts, and conversion metrics.
import { mockPipelineSummary } from './data/mockDashboardData.js';
import { ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PipelineSummary = () => {
  const totalPipelineValue = mockPipelineSummary.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            Sales Pipeline Summary
          </h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            Total Active Pipeline: <strong className="text-brand-600 dark:text-brand-400">${totalPipelineValue.toLocaleString()}</strong>
          </p>
        </div>

        <Link
          to="/deals"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 transition-colors"
        >
          <span>View Pipeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stage cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 flex-1">
        {mockPipelineSummary.map((item, idx) => {
          const percentOfTotal = Math.round((item.value / totalPipelineValue) * 100);
          return (
            <div
              key={item.stage}
              className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] flex flex-col justify-between hover:border-brand-400/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                  <span className="truncate">{item.stage}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-sunken)] text-[var(--color-text-muted)]">
                    {item.count} deals
                  </span>
                </div>

                <div className="text-lg font-bold text-[var(--color-text-primary)] mt-1">
                  ${item.value.toLocaleString()}
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] mb-1">
                  <span>Share</span>
                  <span>{percentOfTotal}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-sunken)] overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-300"
                    style={{ width: `${percentOfTotal}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
