// filepath: src/components/layout/SidebarLogo.jsx
// Brand mark + name. Collapses to the mark only.
import { Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn.js';
import { Link } from 'react-router-dom';

export const SidebarLogo = ({ collapsed = false, onNavigate }) => (
  <Link
    to="/dashboard"
    onClick={onNavigate}
    className={cn(
      'flex items-center gap-3 px-3 h-16 border-b border-[var(--color-border)]',
      'transition-colors duration-200 hover:bg-[var(--color-surface-sunken)]',
    )}
    aria-label="Go to dashboard"
  >
    <div className="relative w-9 h-9 rounded-[var(--radius-lg)] flex items-center justify-center bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-[var(--shadow-glow)] shrink-0">
      <Sparkles className="w-5 h-5" strokeWidth={2.25} />
      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success-500 border-2 border-[var(--color-surface-raised)] animate-pulse-soft" />
    </div>
    <div
      className={cn(
        'flex flex-col leading-tight overflow-hidden transition-all duration-300',
        collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
      )}
    >
      <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">Acme CRM</span>
      <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">Enterprise</span>
    </div>
  </Link>
);
