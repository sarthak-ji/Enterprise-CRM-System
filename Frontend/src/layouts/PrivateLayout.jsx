// filepath: src/layouts/PrivateLayout.jsx
// Authenticated app shell: sidebar + topbar + content area.
// Sidebar handles its own responsive rendering (desktop rail vs mobile drawer).
// The main column's left margin tracks the desktop rail only.
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar.jsx';
import { Topbar } from '@/components/layout/Topbar.jsx';
import { useSidebar } from '@/context/SidebarContext.jsx';
import { cn } from '@/utils/cn.js';

export const PrivateLayout = () => {
  const { isCollapsed, isDesktop } = useSidebar();
  return (
    <div className="min-h-screen flex bg-[var(--color-surface-muted)] text-[var(--color-text-primary)]">
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-[margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isDesktop && (isCollapsed ? 'ml-16' : 'ml-64'),
        )}
      >
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
