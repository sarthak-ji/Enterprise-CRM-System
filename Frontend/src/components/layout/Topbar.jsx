// filepath: src/components/layout/Topbar.jsx
// Professional Sticky CRM Navbar containing:
// Mobile Sidebar Hamburger, Breadcrumb, Search Bar (Ctrl+K), Messages, Notifications, Dark Mode Toggle, Profile Dropdown.
import { useLocation } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { cn } from '@/utils/cn.js';
import { PRIMARY_NAV, SECONDARY_NAV } from './navigation.js';
import { Tooltip } from '@/components/ui/Tooltip.jsx';
import { TopbarSearch } from './topbar/TopbarSearch.jsx';
import { NotificationsDropdown } from './topbar/NotificationsDropdown.jsx';
import { MessagesDropdown } from './topbar/MessagesDropdown.jsx';
import { ProfileDropdown } from './topbar/ProfileDropdown.jsx';

/** Look up the current nav item to derive the breadcrumb label + icon */
const ALL_NAV = [...PRIMARY_NAV, ...SECONDARY_NAV];
const findNavItem = (pathname) =>
  ALL_NAV.find((n) => n.path && pathname.startsWith(n.path)) ?? null;

export const Topbar = () => {
  const { toggleMobile, isDesktop } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const currentNav = findNavItem(pathname);
  const PageIcon = currentNav?.icon;
  const pageLabel = currentNav?.label ?? 'Dashboard';

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex items-center justify-between gap-2 sm:gap-4 h-16 px-4 sm:px-6',
        'bg-[var(--color-surface-raised)]/80 backdrop-blur-md',
        'border-b border-[var(--color-border)] shadow-xs',
        'transition-colors duration-200'
      )}
    >
      {/* Left side: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        {!isDesktop && (
          <Tooltip content="Open menu" side="bottom">
            <button
              type="button"
              onClick={toggleMobile}
              className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors shrink-0"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" strokeWidth={2} />
            </button>
          </Tooltip>
        )}

        {/* Dynamic Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          {PageIcon && (
            <PageIcon
              className="w-5 h-5 text-[var(--color-brand-500)] shrink-0"
              strokeWidth={2}
            />
          )}
          <h1 className="text-sm sm:text-base font-semibold text-[var(--color-text-primary)] truncate">
            {pageLabel}
          </h1>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex items-center justify-center flex-1 max-w-md mx-2">
        <TopbarSearch />
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Messages Dropdown */}
        <MessagesDropdown />

        {/* Notifications Dropdown */}
        <NotificationsDropdown />

        {/* Dark Mode Toggle */}
        <Tooltip
          content={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          side="bottom"
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-[18px] h-[18px]" strokeWidth={2} />
            ) : (
              <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
            )}
          </button>
        </Tooltip>

        <div className="h-5 w-px bg-[var(--color-border)] mx-1 hidden sm:block" />

        {/* User Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Topbar;
