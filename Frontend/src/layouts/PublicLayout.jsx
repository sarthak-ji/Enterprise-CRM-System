// filepath: src/layouts/PublicLayout.jsx
// Layout for unauthenticated pages (Login, Register, Forgot Password, Reset Password).
// Features a responsive split layout with modern ambient gradients and brand showcase.
import { Outlet, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';
import { Sun, Moon } from 'lucide-react';

export const PublicLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] relative overflow-x-hidden">
      {/* Theme toggle in top corner */}
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-sm transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Left side: Brand Showcase Hero Panel (hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 text-white p-12 flex-col justify-between overflow-hidden">
        {/* Ambient glow Orbs */}
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-accent-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-3 relative z-10 w-fit">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white shadow-[var(--shadow-glow)]">
            <Sparkles className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Acme CRM</span>
        </Link>

        {/* Hero Copy & Value Props */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-accent-300">
              <Zap className="w-3.5 h-3.5" /> Next-Gen Enterprise CRM
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Manage leads, close deals, & scale your business.
            </h1>
            <p className="text-base text-brand-100/90 leading-relaxed">
              Empower your sales team with intelligent pipelines, real-time analytics, and seamless customer management.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-accent-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-brand-100">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-accent-400 shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-brand-100">Real-Time Insights</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-brand-200/70">
          © {new Date().getFullYear()} Acme CRM Inc. All rights reserved.
        </div>
      </div>

      {/* Right side: Authentication Form Outlet */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative">
        {/* Mobile Brand Header */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Acme CRM</span>
        </div>

        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
