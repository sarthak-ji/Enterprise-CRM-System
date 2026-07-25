// filepath: src/components/layout/MobileSidebar.jsx
// Off-canvas drawer used on screens < lg. Slides in from the left with a backdrop.
// Reuses the desktop Sidebar's content so both views stay in sync.
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext.jsx';
import { cn } from '@/utils/cn.js';
import { SidebarLogo } from './SidebarLogo.jsx';
import { NavGroup } from './NavGroup.jsx';
import { PRIMARY_NAV, SECONDARY_NAV } from './navigation.js';
import { Tooltip } from '@/components/ui/Tooltip.jsx';

export const MobileSidebar = () => {
  const { isMobileOpen, closeMobile } = useSidebar();

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!isMobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isMobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isMobileOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closeMobile(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileOpen, closeMobile]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden',
        isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!isMobileOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeMobile}
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-300',
          isMobileOpen ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'absolute inset-y-0 left-0 w-72 max-w-[85vw]',
          'flex flex-col bg-[var(--color-surface-raised)]',
          'border-r border-[var(--color-border)] shadow-[var(--shadow-2xl)]',
          'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="relative">
          <SidebarLogo onNavigate={closeMobile} />
          <Tooltip content="Close" side="bottom">
            <button
              type="button"
              onClick={closeMobile}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 flex flex-col gap-1">
          <NavGroup label="Workspace" items={PRIMARY_NAV} />
          <div className="my-3 mx-4 ds-divider" />
          <NavGroup label="Account"   items={SECONDARY_NAV} />
        </nav>

        <SidebarFooter />
      </aside>
    </div>
  );
};

// Reused for desktop too. Kept here to keep the desktop file lean.
const SidebarFooter = () => (
  <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
    <p className="text-[10px] text-center text-[var(--color-text-muted)]">
      Acme CRM v1.0 · © {new Date().getFullYear()}
    </p>
  </div>
);
