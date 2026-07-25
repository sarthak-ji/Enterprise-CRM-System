// filepath: src/pages/auth/RegisterPage.jsx
// Register Page with React Hook Form validation, password matching, terms agreement, loading state, and mock registration.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/utils/cn.js';

export default function RegisterPage() {
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

    toast.success('Account created successfully! Please sign in.');
    navigate('/login');
  };

  return (
    <div className="ds-card p-6 sm:p-8 shadow-[var(--shadow-xl)] border border-[var(--color-border)] rounded-[var(--radius-card)] bg-[var(--color-surface-raised)]">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Create your CRM account
        </h2>
        <p className="text-xs text-[var(--color-text-muted)]">
          Get started with your 14-day free trial. No credit card required.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Full Name Field */}
        <div>
          <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="John Doe"
              {...register('name', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              className={cn('ds-input pl-9 text-sm', errors.name && 'ds-input-error')}
            />
          </div>
          {errors.name && (
            <p className="ds-error text-xs mt-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Work Email Field */}
        <div>
          <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">
            Work Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="name@company.com"
              {...register('email', {
                required: 'Work email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              className={cn('ds-input pl-9 text-sm', errors.email && 'ds-input-error')}
            />
          </div>
          {errors.email && (
            <p className="ds-error text-xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              {...register('password', {
                required: 'Password is required',
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

        {/* Confirm Password Field */}
        <div>
          <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 block">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => val === password || 'Passwords do not match',
              })}
              className={cn('ds-input pl-9 pr-10 text-sm', errors.confirmPassword && 'ds-input-error')}
            />
          </div>
          {errors.confirmPassword && (
            <p className="ds-error text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms Agreement Checkbox */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-[var(--color-text-secondary)]">
            <input
              type="checkbox"
              {...register('terms', {
                required: 'You must accept the terms & privacy policy',
              })}
              className="mt-0.5 w-4 h-4 rounded border-[var(--color-border)] text-brand-600 focus:ring-brand-500 cursor-pointer"
            />
            <span>
              I agree to the{' '}
              <a href="#terms" className="text-brand-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-brand-600 hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms && (
            <p className="ds-error text-xs mt-1 font-medium">{errors.terms.message}</p>
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
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Sign in link */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-muted)]">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
