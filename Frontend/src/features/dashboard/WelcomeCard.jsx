// filepath: src/features/dashboard/WelcomeCard.jsx
// Hero welcome card for the dashboard with user greetings and quick action buttons.
import { Plus, UserPlus, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export const WelcomeCard = () => {
  const { user } = useAuth();
  const userName = user?.name || 'Sales Team';
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-900 text-white p-6 shadow-[var(--shadow-lg)]">
      {/* Background glow effects */}
      <div className="absolute -right-10 -top-10 w-60 h-60 rounded-full bg-accent-500/20 blur-3xl pointer-events-none" />
      <div className="absolute right-40 -bottom-10 w-40 h-40 rounded-full bg-brand-400/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-brand-100 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent-400" />
            <span>{formattedDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-sm text-brand-100/90 mt-1 max-w-xl">
            Here's what's happening with your pipeline today. You have{' '}
            <span className="font-semibold text-white">3 urgent tasks</span> and{' '}
            <span className="font-semibold text-white">5 new leads</span> requiring action.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/leads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] bg-white text-brand-700 hover:bg-brand-50 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Lead</span>
          </Link>
          <Link
            to="/deals"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-all duration-200 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Deal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
