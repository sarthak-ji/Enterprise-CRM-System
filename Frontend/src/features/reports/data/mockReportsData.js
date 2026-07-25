// filepath: src/features/reports/data/mockReportsData.js
// Comprehensive mock analytics data for all Sales Report charts and KPI widgets.

export const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 68000, target: 60000, deals: 22 },
  { month: 'Feb', revenue: 82000, target: 72000, deals: 28 },
  { month: 'Mar', revenue: 76000, target: 80000, deals: 25 },
  { month: 'Apr', revenue: 95000, target: 85000, deals: 34 },
  { month: 'May', revenue: 112000, target: 98000, deals: 41 },
  { month: 'Jun', revenue: 108000, target: 105000, deals: 38 },
  { month: 'Jul', revenue: 128450, target: 115000, deals: 47 },
];

export const CONVERSION_RATE = [
  { stage: 'New', leads: 420, converted: 315, rate: 75 },
  { stage: 'Qualified', leads: 315, converted: 210, rate: 67 },
  { stage: 'Proposal', leads: 210, converted: 140, rate: 67 },
  { stage: 'Negotiation', leads: 140, converted: 98, rate: 70 },
  { stage: 'Won', leads: 98, converted: 98, rate: 100 },
];

export const LEAD_SOURCES = [
  { name: 'Website Organic', value: 450, color: '#6366f1' },
  { name: 'Direct Sales', value: 320, color: '#06b6d4' },
  { name: 'Referrals', value: 280, color: '#10b981' },
  { name: 'Social Media', value: 220, color: '#f59e0b' },
  { name: 'Email Campaigns', value: 150, color: '#a855f7' },
];

export const TOP_SALESPEOPLE = [
  { name: 'Alex Rivera', deals: 18, revenue: 142000, avatar: 'AR', quota: 94 },
  { name: 'Jessica Taylor', deals: 14, revenue: 115000, avatar: 'JT', quota: 88 },
  { name: 'Marcus Vance', deals: 11, revenue: 94000, avatar: 'MV', quota: 82 },
  { name: 'Elena Rostova', deals: 8, revenue: 67000, avatar: 'ER', quota: 68 },
];

export const DEAL_STAGE_DISTRIBUTION = [
  { name: 'New', value: 42, color: '#6366f1' },
  { name: 'Qualified', value: 28, color: '#06b6d4' },
  { name: 'Proposal', value: 18, color: '#f59e0b' },
  { name: 'Negotiation', value: 12, color: '#a855f7' },
  { name: 'Won', value: 24, color: '#10b981' },
  { name: 'Lost', value: 9, color: '#ef4444' },
];

export const WEEKLY_ACTIVITY = [
  { week: 'Week 1', calls: 82, emails: 140, meetings: 24, deals: 8 },
  { week: 'Week 2', calls: 94, emails: 165, meetings: 30, deals: 12 },
  { week: 'Week 3', calls: 78, emails: 120, meetings: 22, deals: 9 },
  { week: 'Week 4', calls: 110, emails: 190, meetings: 38, deals: 15 },
];

export const REPORT_KPIS = {
  totalRevenue: { value: '$669,450', change: '+22.4%', isPositive: true },
  avgDealSize: { value: '$42,800', change: '+8.1%', isPositive: true },
  winRate: { value: '68%', change: '+4.2%', isPositive: true },
  salesCycle: { value: '24 days', change: '-3 days', isPositive: true },
};
