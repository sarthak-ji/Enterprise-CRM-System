// filepath: src/pages/reports/ReportsPage.jsx
// CRM Sales Reports Page — Full analytics dashboard with KPI cards, 7 Recharts visualizations,
// date-range filters, period selectors, and CSV / PDF export actions.
import { useState } from 'react';
import { BarChart3, Download } from 'lucide-react';
import { ReportsKpiCards } from '@/features/reports/ReportsKpiCards.jsx';
import { ReportsFilterBar } from '@/features/reports/ReportsFilterBar.jsx';
import { RevenueLineChart } from '@/features/reports/RevenueLineChart.jsx';
import { ConversionRateChart } from '@/features/reports/ConversionRateChart.jsx';
import { LeadSourcePieChart } from '@/features/reports/LeadSourcePieChart.jsx';
import { DealStagePieChart } from '@/features/reports/DealStagePieChart.jsx';
import { TopSalespersonChart } from '@/features/reports/TopSalespersonChart.jsx';
import { MonthlySalesBarChart } from '@/features/reports/MonthlySalesBarChart.jsx';
import { WeeklyActivityChart } from '@/features/reports/WeeklyActivityChart.jsx';

export default function ReportsPage() {
  const [activePeriod, setActivePeriod] = useState('ytd');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Sales Reports & Analytics
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Comprehensive pipeline performance metrics, revenue trends, and team analytics
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
          <BarChart3 className="w-4 h-4 text-brand-500" />
          <span>
            Period:{' '}
            <span className="font-semibold text-[var(--color-text-primary)] capitalize">
              {activePeriod === 'ytd'
                ? 'Year to Date'
                : activePeriod === 'q'
                ? 'Last Quarter'
                : activePeriod === '30d'
                ? 'Last 30 Days'
                : activePeriod === '7d'
                ? 'Last 7 Days'
                : `${dateFrom} → ${dateTo || '...'}`}
            </span>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <ReportsFilterBar
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
      />

      {/* KPI Summary Cards */}
      <ReportsKpiCards />

      {/* ROW 1: Revenue Line Chart + Conversion Rate Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueLineChart />
        <ConversionRateChart />
      </div>

      {/* ROW 2: Monthly Sales Bar + Weekly Activity Stacked Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlySalesBarChart />
        <WeeklyActivityChart />
      </div>

      {/* ROW 3: Top Salesperson (wide) + Lead Source Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopSalespersonChart />
        </div>
        <LeadSourcePieChart />
      </div>

      {/* ROW 4: Deal Stage Distribution Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DealStagePieChart />

        {/* Summary Data Table */}
        <div className="lg:col-span-2 ds-card p-5 flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
              Monthly Revenue Summary
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Month-by-month revenue, target, and deals closed
            </p>
          </div>

          <div className="ds-table-wrapper border-none shadow-none flex-1">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                  <th>Target</th>
                  <th>Deals Closed</th>
                  <th>vs Target</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: 'Jan', revenue: 68000, target: 60000, deals: 22 },
                  { month: 'Feb', revenue: 82000, target: 72000, deals: 28 },
                  { month: 'Mar', revenue: 76000, target: 80000, deals: 25 },
                  { month: 'Apr', revenue: 95000, target: 85000, deals: 34 },
                  { month: 'May', revenue: 112000, target: 98000, deals: 41 },
                  { month: 'Jun', revenue: 108000, target: 105000, deals: 38 },
                  { month: 'Jul', revenue: 128450, target: 115000, deals: 47 },
                ].map((row) => {
                  const diff = row.revenue - row.target;
                  const pct = ((diff / row.target) * 100).toFixed(1);
                  const isPositive = diff >= 0;
                  return (
                    <tr key={row.month}>
                      <td className="font-semibold">{row.month}</td>
                      <td className="font-bold text-brand-600 dark:text-brand-400">
                        ${row.revenue.toLocaleString()}
                      </td>
                      <td className="text-[var(--color-text-muted)]">
                        ${row.target.toLocaleString()}
                      </td>
                      <td className="font-semibold">{row.deals}</td>
                      <td>
                        <span
                          className={`text-xs font-bold ${
                            isPositive
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {pct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
