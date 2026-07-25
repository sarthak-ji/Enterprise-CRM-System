// filepath: src/pages/dashboard/DashboardPage.jsx
// Complete responsive CRM Dashboard page layout containing all analytics widgets and data cards.
import { WelcomeCard } from '@/features/dashboard/WelcomeCard.jsx';
import { KpiCards } from '@/features/dashboard/KpiCards.jsx';
import { MonthlyRevenueChart } from '@/components/charts/MonthlyRevenueChart.jsx';
import { LeadSourcesChart } from '@/components/charts/LeadSourcesChart.jsx';
import { PipelineSummary } from '@/features/dashboard/PipelineSummary.jsx';
import { RecentLeadsTable } from '@/features/dashboard/RecentLeadsTable.jsx';
import { UpcomingTasks } from '@/features/dashboard/UpcomingTasks.jsx';
import { RecentActivities } from '@/features/dashboard/RecentActivities.jsx';
import { PerformanceCards } from '@/features/dashboard/PerformanceCards.jsx';

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* 1. Welcome Card Banner */}
      <WelcomeCard />

      {/* 2. Primary KPI Cards Grid (Revenue, Leads, Deals, Customers) */}
      <KpiCards />

      {/* 3. Revenue Trend Chart & Lead Sources Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyRevenueChart />
        </div>
        <div className="lg:col-span-1">
          <LeadSourcesChart />
        </div>
      </div>

      {/* 4. Sales Pipeline Summary */}
      <PipelineSummary />

      {/* 5. Recent Leads Table & Upcoming Tasks Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentLeadsTable />
        </div>
        <div className="lg:col-span-1">
          <UpcomingTasks />
        </div>
      </div>

      {/* 6. Recent Activities Feed & Sales Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecentActivities />
        </div>
        <div className="lg:col-span-2">
          <PerformanceCards />
        </div>
      </div>
    </div>
  );
}
