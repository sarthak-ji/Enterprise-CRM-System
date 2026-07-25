// filepath: src/features/dashboard/data/mockDashboardData.js
// Mock data for CRM Dashboard statistics, charts, tables, tasks, and activities.

export const mockKpiData = {
  revenue: {
    title: 'Total Revenue',
    value: '$128,450',
    change: '+14.2%',
    isPositive: true,
    target: '$150,000',
    sparkline: [42, 55, 68, 74, 90, 85, 102, 115, 128],
  },
  leads: {
    title: 'Total Leads',
    value: '1,420',
    change: '+8.7%',
    isPositive: true,
    target: '1,500',
    sparkline: [110, 125, 130, 142, 150, 168, 175, 190],
  },
  deals: {
    title: 'Active Deals',
    value: '348',
    change: '+23.5%',
    isPositive: true,
    pipelineValue: '$485,000',
    sparkline: [20, 25, 32, 28, 35, 42, 48, 54],
  },
  customers: {
    title: 'Total Customers',
    value: '892',
    change: '+5.4%',
    isPositive: true,
    retentionRate: '96.8%',
    sparkline: [70, 72, 75, 78, 80, 84, 87, 92],
  },
};

export const mockRevenueData = [
  { month: 'Jan', revenue: 65000, target: 60000, deals: 32 },
  { month: 'Feb', revenue: 78000, target: 70000, deals: 40 },
  { month: 'Mar', revenue: 92000, target: 85000, deals: 48 },
  { month: 'Apr', revenue: 88000, target: 90000, deals: 42 },
  { month: 'May', revenue: 105000, target: 95000, deals: 55 },
  { month: 'Jun', revenue: 118000, target: 105000, deals: 62 },
  { month: 'Jul', revenue: 128450, target: 115000, deals: 68 },
];

export const mockLeadSources = [
  { name: 'Website Organic', value: 450, color: '#6366f1' },
  { name: 'Direct Sales', value: 320, color: '#06b6d4' },
  { name: 'Referrals', value: 280, color: '#10b981' },
  { name: 'Social Media', value: 220, color: '#f59e0b' },
  { name: 'Email Campaigns', value: 150, color: '#818cf8' },
];

export const mockPipelineSummary = [
  { stage: 'Prospecting', count: 42, value: 125000, conversion: '85%' },
  { stage: 'Qualification', count: 28, value: 98000, conversion: '68%' },
  { stage: 'Proposal', count: 18, value: 145000, conversion: '52%' },
  { stage: 'Negotiation', count: 12, value: 82000, conversion: '40%' },
  { stage: 'Closed Won', count: 24, value: 165000, conversion: '100%' },
];

export const mockRecentLeads = [
  {
    id: 'lead-1',
    name: 'Sarah Connor',
    company: 'Cyberdyne Systems',
    email: 'sarah@cyberdyne.com',
    status: 'Qualified',
    statusTone: 'success',
    value: '$24,000',
    date: '2 hours ago',
    avatar: 'SC',
  },
  {
    id: 'lead-2',
    name: 'Bruce Wayne',
    company: 'Wayne Enterprises',
    email: 'bruce@wayneent.com',
    status: 'Proposal',
    statusTone: 'warning',
    value: '$85,000',
    date: '4 hours ago',
    avatar: 'BW',
  },
  {
    id: 'lead-3',
    name: 'Diana Prince',
    company: 'Themyscira Global',
    email: 'diana@themyscira.io',
    status: 'Contacted',
    statusTone: 'info',
    value: '$42,500',
    date: '1 day ago',
    avatar: 'DP',
  },
  {
    id: 'lead-4',
    name: 'Clark Kent',
    company: 'Daily Planet Press',
    email: 'clark@dailyplanet.com',
    status: 'New',
    statusTone: 'brand',
    value: '$18,000',
    date: '2 days ago',
    avatar: 'CK',
  },
  {
    id: 'lead-5',
    name: 'Tony Stark',
    company: 'Stark Industries',
    email: 'tony@stark.com',
    status: 'Negotiation',
    statusTone: 'warning',
    value: '$120,000',
    date: '3 days ago',
    avatar: 'TS',
  },
];

export const mockActivities = [
  {
    id: 'act-1',
    user: 'Alex Rivera',
    action: 'closed deal',
    target: 'Cyberdyne Expansion ($24k)',
    type: 'deal',
    timestamp: '15 mins ago',
  },
  {
    id: 'act-2',
    user: 'Jessica Taylor',
    action: 'added new lead',
    target: 'Wayne Enterprises',
    type: 'lead',
    timestamp: '1 hour ago',
  },
  {
    id: 'act-3',
    user: 'Marcus Vance',
    action: 'scheduled demo call',
    target: 'Themyscira Global',
    type: 'call',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-4',
    user: 'Elena Rostova',
    action: 'sent proposal email',
    target: 'Stark Industries',
    type: 'email',
    timestamp: '4 hours ago',
  },
  {
    id: 'act-5',
    user: 'David Miller',
    action: 'completed task',
    target: 'Follow up on Q3 Contract',
    type: 'task',
    timestamp: '5 hours ago',
  },
];

export const mockPerformanceData = [
  {
    id: 'rep-1',
    name: 'Alex Rivera',
    role: 'Senior AE',
    quotaProgress: 94,
    dealsClosed: 18,
    revenue: '$142,000',
    avatar: 'AR',
  },
  {
    id: 'rep-2',
    name: 'Jessica Taylor',
    role: 'Account Executive',
    quotaProgress: 88,
    dealsClosed: 14,
    revenue: '$115,000',
    avatar: 'JT',
  },
  {
    id: 'rep-3',
    name: 'Marcus Vance',
    role: 'SDR Team Lead',
    quotaProgress: 82,
    dealsClosed: 11,
    revenue: '$94,000',
    avatar: 'MV',
  },
];

export const mockUpcomingTasks = [
  {
    id: 'task-1',
    title: 'Product Demo with Stark Industries',
    dueDate: 'Today, 3:30 PM',
    priority: 'High',
    completed: false,
    category: 'Meeting',
  },
  {
    id: 'task-2',
    title: 'Send Revised Proposal to Wayne Ent.',
    dueDate: 'Today, 5:00 PM',
    priority: 'Urgent',
    completed: false,
    category: 'Document',
  },
  {
    id: 'task-3',
    title: 'Follow up call with Cyberdyne lead',
    dueDate: 'Tomorrow, 10:00 AM',
    priority: 'Medium',
    completed: true,
    category: 'Call',
  },
  {
    id: 'task-4',
    title: 'Review Q3 Sales Targets with Team',
    dueDate: 'Jul 28, 2:00 PM',
    priority: 'Low',
    completed: false,
    category: 'Internal',
  },
];
