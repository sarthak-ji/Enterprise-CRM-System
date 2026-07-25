// filepath: src/pages/auth/LoginPage.jsx
// Login Page with React Hook Form validation, show password toggle, remember me, loading states, and mock submit handler.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext.jsx';
import { cn } from '@/utils/cn.js';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'admin@acmecrm.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API delay for realistic loading feedback
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    toast.success('Successfully logged in!');

    // Mock login hydration in AuthContext if needed or direct redirect
    try {
      if (login) {
        await login({ email: data.email, password: data.password }).catch(() => {});
      }
    } finally {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="ds-card p-6 sm:p-8 shadow-[var(--shadow-xl)] border border-[var(--color-border)] rounded-[var(--radius-card)] bg-[var(--color-surface-raised)]">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Welcome back
        </h2>
        <p className="text-xs text-[var(--color-text-muted)]">
          Enter your credentials to access your CRM account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Email Field */}
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
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              className={cn(
                'ds-input pl-9 text-sm',
                errors.email && 'ds-input-error'
              )}
            />
          </div>
          {errors.email && (
            <p className="ds-error text-xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="ds-label text-xs font-semibold text-[var(--color-text-secondary)]">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={cn(
                'ds-input pl-9 pr-10 text-sm',
                errors.password && 'ds-input-error'
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="ds-error text-xs mt-1 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[var(--color-text-secondary)]">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="w-4 h-4 rounded border-[var(--color-border)] text-brand-600 focus:ring-brand-500 cursor-pointer"
            />
            <span>Remember me for 30 days</span>
          </label>
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
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer link to Register */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-muted)]">
        Don't have a CRM account yet?{' '}
        <Link
          to="/register"
          className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:underline"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
