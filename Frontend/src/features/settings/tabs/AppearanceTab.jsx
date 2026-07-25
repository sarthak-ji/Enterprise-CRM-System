// filepath: src/features/settings/tabs/AppearanceTab.jsx
// Appearance Settings Tab — Theme (Light, Dark, System), Compact mode, primary brand accent color.
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext.jsx';
import { toast } from 'react-hot-toast';
import { Sun, Moon, Laptop, Palette, Layout, Save } from 'lucide-react';
import { cn } from '@/utils/cn.js';

const BRAND_ACCENTS = [
  { id: 'indigo', label: 'Indigo (Default)', color: '#6366f1' },
  { id: 'cyan', label: 'Cyan Teal', color: '#06b6d4' },
  { id: 'emerald', label: 'Emerald Green', color: '#10b981' },
  { id: 'purple', label: 'Royal Purple', color: '#a855f7' },
  { id: 'amber', label: 'Amber Gold', color: '#f59e0b' },
];

export const AppearanceTab = () => {
  const { theme, setTheme } = useTheme();
  const [selectedAccent, setSelectedAccent] = useState('indigo');
  const [compactDensity, setCompactDensity] = useState(false);

  const handleSave = () => {
    toast.success('Appearance settings saved!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Theme Preference Selection */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-500" />
          <span>Interface Color Theme</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              id: 'light',
              label: 'Light Theme',
              desc: 'Clean, high contrast white background',
              icon: Sun,
            },
            {
              id: 'dark',
              label: 'Dark Theme',
              desc: 'Sleek dark mode tailored for low light',
              icon: Moon,
            },
            {
              id: 'system',
              label: 'System Preference',
              desc: 'Sync with your operating system theme',
              icon: Laptop,
            },
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id === 'system' ? 'light' : t.id)}
                className={cn(
                  'p-4 rounded-[var(--radius-card)] border cursor-pointer flex flex-col justify-between transition-all duration-200',
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/50'
                    : 'border-[var(--color-border)] bg-[var(--color-surface-muted)] hover:border-brand-300'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <input
                    type="radio"
                    name="theme-select"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[var(--color-text-primary)]">{t.label}</h5>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{t.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Accent Color */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          Primary Accent Color
        </h4>

        <div className="flex flex-wrap items-center gap-3">
          {BRAND_ACCENTS.map((accent) => (
            <button
              key={accent.id}
              type="button"
              onClick={() => setSelectedAccent(accent.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] border text-xs font-semibold transition-all',
                selectedAccent === accent.id
                  ? 'border-brand-600 bg-[var(--color-surface-sunken)] ring-2 ring-brand-500/40'
                  : 'border-[var(--color-border)] bg-[var(--color-surface-muted)] hover:border-slate-400'
              )}
            >
              <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: accent.color }} />
              <span>{accent.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Display Density */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
          <Layout className="w-4 h-4 text-cyan-500" />
          <span>Display & Layout Density</span>
        </h4>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-primary)]">
              Compact Data Tables
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)]">
              Reduce table padding to view more rows on screen simultaneously.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={compactDensity}
              onChange={() => setCompactDensity(!compactDensity)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600" />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="ds-btn ds-btn-primary text-xs h-9 px-5 shadow-sm gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Appearance Settings</span>
        </button>
      </div>
    </div>
  );
};
