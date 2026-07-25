// filepath: src/components/layout/navigation.js
// Centralized navigation config. Drives both Sidebar and Topbar breadcrumbs.
// Add a route here once and it shows up in the sidebar.
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  Briefcase,
  CheckSquare,
  PieChart,
  Mail,
  UserCog,
  Settings,
  LogOut,
} from 'lucide-react';

export const PRIMARY_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'leads',     label: 'Leads',     icon: Users,           path: '/leads' },
  { id: 'customers', label: 'Customers', icon: UserCircle2,     path: '/customers' },
  { id: 'deals',     label: 'Pipeline',  icon: Briefcase,       path: '/deals' },
  { id: 'tasks',     label: 'Tasks',     icon: CheckSquare,     path: '/tasks' },
  { id: 'reports',   label: 'Reports',   icon: PieChart,        path: '/reports',  roles: ['admin', 'manager'] },
  { id: 'emails',    label: 'Emails',    icon: Mail,            path: '/emails' },
  { id: 'users',     label: 'Users',     icon: UserCog,         path: '/users',    roles: ['admin'] },
];

export const SECONDARY_NAV = [
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'logout',   label: 'Logout',   icon: LogOut,   action: 'logout' },
];
