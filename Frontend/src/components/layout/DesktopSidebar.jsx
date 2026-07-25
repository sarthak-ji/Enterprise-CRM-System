// filepath: src/components/layout/DesktopSidebar.jsx
// Permanent sidebar for screens >= lg. Width is driven by `isCollapsed`.
// Mobile users see MobileSidebar instead — this component never renders on small screens.
import { useSidebar } from '@/context/SidebarContext.jsx';
import { cn } from '@/utils/cn.js';
import { SidebarLogo } from './SidebarLogo.jsx';
import { SidebarToggle } from './SidebarToggle.jsx';
import { NavGroup } from './NavGroup.jsx';
import { PRIMARY_NAV, SECONDARY_NAV } from './navigation.js';

export const DesktopSidebar = () => {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        'hidden lg:flex fixed inset-y-0 left-0 z-30 flex-col',
        'bg-[var(--color-surface-raised)] border-r border-[var(--color-border)]',
        'transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'shadow-[var(--shadow-sm)]',
        isCollapsed ? 'w-16' : 'w-64',
      )}
      aria-label="Primary navigation"
    >
      <SidebarLogo collapsed={isCollapsed} />

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 flex flex-col gap-1">
        <NavGroup label="Workspace" items={PRIMARY_NAV} collapsed={isCollapsed} />
        <div className={cn('my-3 mx-4 ds-divider', isCollapsed && 'mx-2')} />
        <NavGroup label="Account"   items={SECONDARY_NAV} collapsed={isCollapsed} />
      </nav>

      {/* Collapse toggle pinned to the bottom-right edge */}
      <div className="relative h-12 border-t border-[var(--color-border)]">
        <div className={cn(
          'absolute top-1/2 -translate-y-1/2 transition-all duration-300',
          isCollapsed ? 'left-1/2 -translate-x-1/2' : 'right-3',
        )}>
          <SidebarToggle />
        </div>
      </div>
    </aside>
  );
};
