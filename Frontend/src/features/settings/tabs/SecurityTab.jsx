// filepath: src/features/settings/tabs/SecurityTab.jsx
// Security Settings Tab — Password change, 2-Factor Authentication, and active session management.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Lock, Shield, Eye, EyeOff, KeyRound, Smartphone, Monitor, Save, Loader2, LogOut } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'MacBook Pro (Chrome - macOS)',
      ip: '192.168.1.45',
      location: 'San Francisco, CA, USA',
      lastActive: 'Current session',
      isCurrent: true,
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro (Acme CRM App)',
      ip: '172.56.21.90',
      location: 'San Francisco, CA, USA',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch('newPassword');

  const handlePasswordSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    toast.success('Password changed successfully!');
    reset();
  };

  const revokeSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success('Session revoked');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Change Password Card */}
      <form onSubmit={handleSubmit(handlePasswordSubmit)} className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-brand-500" />
          <span>Change Password</span>
        </h4>

        <div className="space-y-4 max-w-md">
          {/* Current Password */}
          <div>
            <label className="ds-label text-xs font-semibold">Current Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('currentPassword', { required: 'Current password is required' })}
                className={cn('ds-input pl-9 pr-10 text-xs', errors.currentPassword && 'ds-input-error')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="ds-error text-[11px]">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="ds-label text-xs font-semibold">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Must be at least 8 characters' },
                })}
                className={cn('ds-input pl-9 pr-10 text-xs', errors.newPassword && 'ds-input-error')}
              />
            </div>
            {errors.newPassword && (
              <p className="ds-error text-[11px]">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="ds-label text-xs font-semibold">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Confirm new password',
                  validate: (val) => val === newPassword || 'Passwords do not match',
                })}
                className={cn('ds-input pl-9 pr-10 text-xs', errors.confirmPassword && 'ds-input-error')}
              />
            </div>
            {errors.confirmPassword && (
              <p className="ds-error text-[11px]">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="ds-btn ds-btn-primary text-xs h-9 px-4 gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Two-Factor Authentication */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>Two-Factor Authentication (2FA)</span>
        </h4>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold text-[var(--color-text-primary)]">
              {twoFactorEnabled ? '2FA is Enabled' : '2FA is Disabled'}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Secure your account with an Authenticator app (Google Authenticator, 1Password, or Authy).
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setTwoFactorEnabled(!twoFactorEnabled);
              toast.success(twoFactorEnabled ? '2FA Disabled' : '2FA Enabled');
            }}
            className={cn(
              'ds-btn text-xs h-9 px-4',
              twoFactorEnabled ? 'ds-btn-secondary' : 'ds-btn-primary'
            )}
          >
            {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
          <Monitor className="w-4 h-4 text-indigo-500" />
          <span>Active Logged-in Sessions</span>
        </h4>

        <div className="space-y-3 divide-y divide-[var(--color-border)]">
          {sessions.map((s) => (
            <div key={s.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-surface-sunken)] flex items-center justify-center text-[var(--color-text-secondary)] shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                    <span>{s.device}</span>
                    {s.isCurrent && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                        Current Session
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                    IP: {s.ip} • {s.location} • Last active: {s.lastActive}
                  </p>
                </div>
              </div>

              {!s.isCurrent && (
                <button
                  type="button"
                  onClick={() => revokeSession(s.id)}
                  className="ds-btn ds-btn-ghost text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 h-8 px-2.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Revoke</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
