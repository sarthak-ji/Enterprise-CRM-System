// filepath: src/components/layout/topbar/MessagesDropdown.jsx
// Messages dropdown with recent conversations and unread status.
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip.jsx';
import { DropdownShell, DropdownHeader, DropdownFooter, DropdownEmpty } from './DropdownShell.jsx';
import { cn } from '@/utils/cn.js';

const INITIAL_MESSAGES = [
  {
    id: '1',
    sender: 'Sarah Jenkins',
    avatar: 'SJ',
    message: 'Hey! Did you check the proposal for NextCorp?',
    time: '10m ago',
    unread: true,
  },
  {
    id: '2',
    sender: 'Michael Chen',
    avatar: 'MC',
    message: 'The customer requested a call reschedule to 3 PM.',
    time: '45m ago',
    unread: true,
  },
  {
    id: '3',
    sender: 'Emma Watson',
    avatar: 'EW',
    message: 'Thanks for updating the pipeline status!',
    time: '2h ago',
    unread: false,
  },
];

export const MessagesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const unreadCount = messages.filter((m) => m.unread).length;

  const markAllRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, unread: false })));
  };

  return (
    <DropdownShell
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      width="w-80 sm:w-96"
      trigger={
        <Tooltip content="Messages" side="bottom">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              'relative flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]',
              'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]',
              'transition-colors',
              isOpen && 'bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)]'
            )}
            aria-label="Messages"
            aria-expanded={isOpen}
          >
            <MessageSquare className="w-[18px] h-[18px]" strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-[10px] font-bold text-white ring-2 ring-[var(--color-surface-raised)]">
                {unreadCount}
              </span>
            )}
          </button>
        </Tooltip>
      }
    >
      <DropdownHeader
        title="Messages"
        action={
          unreadCount > 0
            ? { label: 'Mark all as read', onClick: markAllRead }
            : null
        }
      />

      <div className="max-h-[360px] overflow-y-auto divide-y divide-[var(--color-border)]">
        {messages.length === 0 ? (
          <DropdownEmpty icon={MessageSquare} message="No messages" />
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              onClick={() =>
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === m.id ? { ...msg, unread: false } : msg
                  )
                )
              }
              className={cn(
                'flex items-start gap-3 p-3.5 cursor-pointer transition-colors duration-150',
                'hover:bg-[var(--color-surface-sunken)]',
                m.unread && 'bg-[var(--color-surface-muted)]'
              )}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                {m.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={cn(
                      'text-xs text-[var(--color-text-primary)] truncate',
                      m.unread ? 'font-semibold' : 'font-medium'
                    )}
                  >
                    {m.sender}
                  </h4>
                  <span className="text-[10px] text-[var(--color-text-muted)] shrink-0">
                    {m.time}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-2">
                  {m.message}
                </p>
              </div>

              {m.unread && (
                <span
                  className="w-2 h-2 rounded-full bg-[var(--color-brand-500)] shrink-0 mt-2"
                  title="Unread"
                />
              )}
            </div>
          ))
        )}
      </div>

      <DropdownFooter className="text-center">
        <a
          href="/emails"
          className="text-xs font-medium text-[var(--color-brand-600)] hover:underline"
          onClick={() => setIsOpen(false)}
        >
          View all messages in Emails
        </a>
      </DropdownFooter>
    </DropdownShell>
  );
};
