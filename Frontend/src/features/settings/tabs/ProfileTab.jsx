// filepath: src/features/settings/tabs/ProfileTab.jsx
// Profile Settings Tab — Manage personal user info, contact details, avatar, and preferences.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext.jsx';
import { User, Mail, Phone, Briefcase, Globe, Camera, Save, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const ProfileTab = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.name || 'Alex Rivera',
      email: user?.email || 'alex.rivera@acmecrm.com',
      jobTitle: 'Senior Account Executive',
      phone: '+1 (555) 234-5678',
      timezone: '(UTC-08:00) Pacific Time (US & Canada)',
      language: 'English (US)',
      bio: 'Sales professional with 8+ years experience in B2B SaaS enterprise software and pipeline management.',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    toast.success('Profile settings updated successfully!');
  };

  const userInitials = (user?.name || 'Alex Rivera')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      {/* Avatar Section */}
      <div className="ds-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md select-none">
            {userInitials}
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 p-2 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-brand-600 shadow-sm transition-colors"
            title="Change avatar"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-[var(--color-text-primary)]">
            {user?.name || 'Alex Rivera'}
          </h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            {user?.role ? user.role.toUpperCase() : 'SENIOR ACCOUNT EXECUTIVE'} • Acme CRM Team
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            <button
              type="button"
              className="ds-btn ds-btn-secondary text-xs h-8 px-3"
              onClick={() => toast.success('Avatar uploaded!')}
            >
              Upload New Photo
            </button>
            <button
              type="button"
              className="ds-btn ds-btn-ghost text-xs h-8 px-3 text-[var(--color-text-muted)]"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info Form */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          Personal Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="ds-label text-xs font-semibold">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                {...register('fullName', { required: 'Full name is required' })}
                className={cn('ds-input pl-9 text-xs', errors.fullName && 'ds-input-error')}
              />
            </div>
            {errors.fullName && <p className="ds-error text-[11px]">{errors.fullName.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="ds-label text-xs font-semibold">Work Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={cn('ds-input pl-9 text-xs', errors.email && 'ds-input-error')}
              />
            </div>
            {errors.email && <p className="ds-error text-[11px]">{errors.email.message}</p>}
          </div>

          {/* Job Title */}
          <div>
            <label className="ds-label text-xs font-semibold">Job Title</label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" {...register('jobTitle')} className="ds-input pl-9 text-xs" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="ds-label text-xs font-semibold">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="tel" {...register('phone')} className="ds-input pl-9 text-xs" />
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="ds-label text-xs font-semibold">Timezone</label>
            <select {...register('timezone')} className="ds-input text-xs">
              <option value="(UTC-08:00) Pacific Time (US & Canada)">
                (UTC-08:00) Pacific Time (US & Canada)
              </option>
              <option value="(UTC-05:00) Eastern Time (US & Canada)">
                (UTC-05:00) Eastern Time (US & Canada)
              </option>
              <option value="(UTC+00:00) London, Dublin">
                (UTC+00:00) London, Dublin
              </option>
              <option value="(UTC+01:00) Paris, Berlin, Amsterdam">
                (UTC+01:00) Paris, Berlin, Amsterdam
              </option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="ds-label text-xs font-semibold">Display Language</label>
            <select {...register('language')} className="ds-input text-xs">
              <option value="English (US)">English (US)</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="French">French (Français)</option>
              <option value="German">German (Deutsch)</option>
            </select>
          </div>
        </div>

        {/* Bio / About */}
        <div>
          <label className="ds-label text-xs font-semibold">Professional Bio</label>
          <textarea
            rows={3}
            {...register('bio')}
            className="ds-input text-xs resize-none"
          />
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="ds-btn ds-btn-primary text-xs h-9 px-5 shadow-sm gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
