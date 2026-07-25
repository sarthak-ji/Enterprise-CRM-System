// filepath: src/components/layout/topbar/NotificationsDropdown.jsx
// Notifications popover with badge counter, unread state toggle, and quick actions.
import { useState } from 'react';
import { Bell, Check, UserPlus, DollarSign, AlertCircle, Calendar } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip.jsx';
import { DropdownShell, DropdownHeader, DropdownFooter, DropdownEmpty } from './DropdownShell.jsx';
import { cn } from '@/utils/cn.js';

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Lead Assigned',
    description: 'Acme Corp was assigned to you by Sarah.',
    time: '5m ago',
    unread: true,
    type: 'lead',
    icon: UserPlus,
    iconBg: 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400',
  },
  {
    id: '2',
    title: 'Deal Won! 🎉',
    description: 'Enterprise plan ($12,000/yr) closed by Alex.',
    time: '1h ago',
    unread: true,
    type: 'deal',
    icon: DollarSign,
    iconBg: 'bg-success-50 text-success-600 dark:bg-emerald-950 dark:text-emerald-400',
  },
  {
    id: '3',
    title: 'Task Due Soon',
    description: 'Follow up call with TechStart Inc.',
    time: '3h ago',
    unread: false,
    type: 'task',
    icon: Calendar,
    iconBg: 'bg-warning-50 text-warning-600 dark:bg-amber-950 dark:text-amber-400',
  },
];

export const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  return (
    <DropdownShell
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      width="w-80 sm:w-96"
      trigger={
        <Tooltip content="Notifications" side="bottom">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              'relative flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]',
              'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]',
              'transition-colors',
              isOpen && 'bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)]'
            )}
            aria-label="Notifications"
            aria-expanded={isOpen}
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--color-danger-500)] text-[10px] font-bold text-white ring-2 ring-[var(--color-surface-raised)]">
                {unreadCount}
              </span>
            )}
          </button>
        </Tooltip>
      }
    >
      <DropdownHeader
        title="Notifications"
        action={
          unreadCount > 0
            ? { label: 'Mark all as read', onClick: markAllRead }
            : null
        }
      />

      <div className="max-h-[360px] overflow-y-auto divide-y divide-[var(--color-border)]">
        {notifications.length === 0 ? (
          <DropdownEmpty icon={Bell} message="No notifications yet" />
        ) : (
          notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                onClick={() => toggleRead(n.id)}
                className={cn(
                  'flex items-start gap-3 p-3.5 cursor-pointer transition-colors duration-150',
                  'hover:bg-[var(--color-surface-sunken)]',
                  n.unread && 'bg-[var(--color-surface-muted)]'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                    n.iconBg
                  )}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={cn(
                        'text-xs text-[var(--color-text-primary)] truncate',
                        n.unread ? 'font-semibold' : 'font-medium'
                      )}
                    >
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-[var(--color-text-muted)] shrink-0">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-2">
                    {n.description}
                  </p>
                </div>

                {n.unread && (
                  <span
                    className="w-2 h-2 rounded-full bg-[var(--color-brand-500)] shrink-0 mt-2"
                    title="Unread"
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      <DropdownFooter className="text-center">
        <a
          href="#notifications"
          className="text-xs font-medium text-[var(--color-brand-600)] hover:underline"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        >
          View all notifications
        </a>
      </DropdownFooter>
    </DropdownShell>
  );
};
