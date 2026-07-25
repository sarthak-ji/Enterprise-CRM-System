// filepath: src/features/dashboard/UpcomingTasks.jsx
// Interactive upcoming tasks widget with completion checkboxes and priority tags.
import { useState } from 'react';
import { mockUpcomingTasks } from './data/mockDashboardData.js';
import { Calendar, CheckSquare, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn.js';

export const UpcomingTasks = () => {
  const [tasks, setTasks] = useState(mockUpcomingTasks);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'ds-badge-danger';
      case 'high':
        return 'ds-badge-warning';
      case 'medium':
        return 'ds-badge-info';
      default:
        return 'ds-badge-neutral';
    }
  };

  return (
    <div className="ds-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            Upcoming Tasks
          </h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            Your schedule & follow-up agenda
          </p>
        </div>

        <Link
          to="/tasks"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 transition-colors"
        >
          <span>All Tasks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[320px] pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={cn(
              'p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] cursor-pointer flex items-start gap-3 transition-colors duration-150',
              task.completed
                ? 'bg-[var(--color-surface-sunken)] opacity-65'
                : 'bg-[var(--color-surface-muted)] hover:border-brand-300'
            )}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
            />

            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-xs font-semibold text-[var(--color-text-primary)] truncate',
                  task.completed && 'line-through text-[var(--color-text-muted)]'
                )}
              >
                {task.title}
              </p>

              <div className="flex items-center gap-3 mt-1 text-[11px] text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[var(--color-text-muted)]" />
                  {task.dueDate}
                </span>
                <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-[var(--color-surface-sunken)]">
                  {task.category}
                </span>
              </div>
            </div>

            <span className={cn('ds-badge text-[10px] py-0 px-1.5 shrink-0', getPriorityBadge(task.priority))}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
