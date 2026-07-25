// filepath: src/pages/auth/ResetPasswordPage.jsx
// Reset Password Page with React Hook Form validation, show password toggle, loading state, and mock submission.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/utils/cn.js';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    toast.success('Password reset successfully! Please log in with your new password.');
    navigate('/login');
  };

  return (
    <div className="ds-card p-6 sm:p-8 shadow-[var(--shadow-xl)] border border-[var(--color-border)] rounded-[var(--radius-card)] bg-[var(--color-surface-raised)]">
      <div className="mb-6 space-y-1">
        <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center mb-3">
          <KeyRound className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Set new password
        </h2>
        <p className="text-xs text-[var(--color-text-muted)]">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* New Password Field */}
        <div>
          <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">
            New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              {...register('password', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              className={cn('ds-input pl-9 pr-10 text-sm', errors.password && 'ds-input-error')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="ds-error text-xs mt-1 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm New Password Field */}
        <div>
          <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat new password"
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (val) => val === password || 'Passwords do not match',
              })}
              className={cn('ds-input pl-9 pr-10 text-sm', errors.confirmPassword && 'ds-input-error')}
            />
          </div>
          {errors.confirmPassword && (
            <p className="ds-error text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="ds-btn ds-btn-primary w-full h-10 mt-2 text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Resetting password...</span>
            </>
          ) : (
            <>
              <span>Reset Password</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-center">
        <Link
          to="/login"
          className="text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
