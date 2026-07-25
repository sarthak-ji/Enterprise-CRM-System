// filepath: src/features/reports/ReportsFilterBar.jsx
// Date range filter, period quick-selector, and Export (CSV/PDF) controls for Sales Reports.
import { Calendar, Download, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PERIODS = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last Quarter', value: 'q' },
  { label: 'YTD', value: 'ytd' },
  { label: 'Custom', value: 'custom' },
];

export const ReportsFilterBar = ({
  activePeriod,
  onPeriodChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}) => {
  const handleExportCSV = () => {
    toast.success('Exporting report as CSV...');
    // Backend integration placeholder
  };

  const handleExportPDF = () => {
    toast.success('Generating PDF report...');
    // Backend integration placeholder
  };

  return (
    <div className="ds-card p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Period quick-select buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onPeriodChange(p.value)}
              className={
                activePeriod === p.value
                  ? 'px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold bg-brand-600 text-white shadow-sm'
                  : 'px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] transition-colors'
              }
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Custom Date Range (visible when 'custom' is selected) */}
          {activePeriod === 'custom' && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => onDateFromChange(e.target.value)}
                  className="ds-input text-xs h-8 pl-8 pr-2 w-[140px]"
                />
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">to</span>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => onDateToChange(e.target.value)}
                  className="ds-input text-xs h-8 pl-8 pr-2 w-[140px]"
                />
              </div>
            </div>
          )}

          {/* Export buttons */}
          <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="ds-btn ds-btn-secondary text-xs h-8 px-3 gap-1.5"
              title="Export as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="ds-btn ds-btn-secondary text-xs h-8 px-3 gap-1.5"
              title="Export as PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
