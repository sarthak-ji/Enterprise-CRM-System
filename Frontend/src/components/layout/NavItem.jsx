// filepath: src/components/layout/NavItem.jsx
// Single navigation row. Handles NavLink active state, action items (logout),
// role-gating, and the collapsed/expanded visual variants.
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { useSidebar } from '@/context/SidebarContext.jsx';
import { cn } from '@/utils/cn.js';
import { Tooltip } from '@/components/ui/Tooltip.jsx';
import { handleApiError } from '@/services/api/errorHandler.js';

export const NavItem = ({ item, collapsed = false }) => {
  const { user, logout } = useAuth();
  const { closeMobile } = useSidebar();
  const navigate = useNavigate();

  const Icon = item.icon;
  const isLogout = item.action === 'logout';

  // Role gating — silently hide items the current user can't access
  if (item.roles && (!user || !item.roles.includes(user.role))) return null;

  const handleClick = async (e) => {
    if (!isLogout) { closeMobile(); return; }
    e.preventDefault();
    try { await logout(); } catch (err) { handleApiError(err, 'Logout failed'); }
    finally { closeMobile(); navigate('/login', { replace: true }); }
  };

  // Shared inner content so both the link and button render identically
  const content = ({ isActive }) => (
    <div
      className={cn(
        'relative flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)]',
        'text-sm font-medium select-none',
        'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'group/item',
        isActive
          ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgb(67_56_202/0.20)] dark:text-[var(--color-brand-200)]'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]',
        isLogout && 'hover:bg-[var(--color-danger-50)] hover:text-[var(--color-danger-700)]',
        collapsed && 'justify-center px-0 w-10 h-10 mx-auto',
      )}
    >
      {/* Active indicator bar */}
      <span
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[var(--color-brand-600)]',
          'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
        )}
        aria-hidden="true"
      />

      <Icon
        className={cn(
          'w-5 h-5 shrink-0 transition-transform duration-200',
          'group-hover/item:scale-110',
          isActive && 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]',
        )}
        strokeWidth={2}
      />

      <span
        className={cn(
          'flex-1 overflow-hidden whitespace-nowrap transition-all duration-300',
          collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
        )}
      >
        {item.label}
      </span>

      {!collapsed && item.badge != null && (
        <span className="ds-badge ds-badge-brand text-[10px] py-0 px-1.5">
          {item.badge}
        </span>
      )}
    </div>
  );

  // Collapsed = tooltip-wrapped for affordance
  if (collapsed) {
    return (
      <li>
        <Tooltip content={item.label} side="right">
          {isLogout ? (
            <button type="button" onClick={handleClick} className="block w-full" aria-label={item.label}>
              {content({ isActive: false })}
            </button>
          ) : (
            <NavLink to={item.path} onClick={handleClick} className="block" aria-label={item.label}>
              {content}
            </NavLink>
          )}
        </Tooltip>
      </li>
    );
  }

  return (
    <li>
      {isLogout ? (
        <button type="button" onClick={handleClick} className="block w-full text-left" aria-label={item.label}>
          {content({ isActive: false })}
        </button>
      ) : (
        <NavLink to={item.path} onClick={handleClick} className="block">
          {content}
        </NavLink>
      )}
    </li>
  );
};
