// filepath: src/components/layout/topbar/ProfileDropdown.jsx
// User Profile Dropdown containing User Avatar, Role badge, Settings link, and Logout trigger.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Settings, LogOut, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext.jsx';
import { DropdownShell } from './DropdownShell.jsx';
import { handleApiError } from '@/services/api/errorHandler.js';
import { cn } from '@/utils/cn.js';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await logout();
    } catch (err) {
      handleApiError(err, 'Logout failed');
    } finally {
      navigate('/login', { replace: true });
    }
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <DropdownShell
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      width="w-60"
      trigger={
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'flex items-center gap-2.5 p-1 pl-1.5 rounded-[var(--radius-lg)]',
            'hover:bg-[var(--color-surface-sunken)] transition-colors duration-150',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] outline-none',
            isOpen && 'bg-[var(--color-surface-sunken)]'
          )}
          aria-label="User profile menu"
          aria-expanded={isOpen}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shadow-[var(--shadow-sm)] select-none shrink-0">
            {userInitials}
          </div>
          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate max-w-[110px]">
              {user?.name ?? 'User Account'}
            </span>
            <span className="text-[10px] text-[var(--color-text-muted)] capitalize">
              {user?.role ?? 'Member'}
            </span>
          </div>
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 text-[var(--color-text-muted)] transition-transform duration-200 hidden sm:block',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      }
    >
      {/* Header section with user info */}
      <div className="p-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]/50 rounded-t-[var(--radius-lg)]">
        <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
          {user?.name ?? 'User Account'}
        </p>
        <p className="text-[11px] text-[var(--color-text-muted)] truncate mt-0.5">
          {user?.email ?? 'user@company.com'}
        </p>
        {user?.role && (
          <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-indigo-950 dark:text-indigo-300">
            <Shield className="w-3 h-3" />
            <span className="capitalize">{user.role}</span>
          </div>
        )}
      </div>

      {/* Menu links */}
      <div className="p-1.5 flex flex-col gap-0.5">
        <Link
          to="/settings"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <Settings className="w-4 h-4 text-[var(--color-text-muted)]" />
          Settings
        </Link>
      </div>

      {/* Logout button */}
      <div className="p-1.5 border-t border-[var(--color-border)]">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-[var(--radius-md)] text-[var(--color-danger-600)] hover:bg-[var(--color-danger-50)] dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </DropdownShell>
  );
};
