// filepath: src/pages/auth/ForgotPasswordPage.jsx
// Forgot Password Page with React Hook Form validation, loading state, and email dispatch feedback card.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/utils/cn.js';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    setSubmittedEmail(data.email);
    setIsSubmitted(true);
    toast.success('Password reset link sent!');
  };

  if (isSubmitted) {
    return (
      <div className="ds-card p-6 sm:p-8 shadow-[var(--shadow-xl)] border border-[var(--color-border)] rounded-[var(--radius-card)] bg-[var(--color-surface-raised)] text-center space-y-5 animate-scale-in">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 stroke-[2.25]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Check your email
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] max-w-xs mx-auto">
            We sent a password reset link to{' '}
            <strong className="text-[var(--color-text-primary)]">{submittedEmail}</strong>.
          </p>
        </div>

        <p className="text-xs text-[var(--color-text-muted)]">
          Didn't receive the email? Check your spam folder or{' '}
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="font-semibold text-brand-600 hover:underline cursor-pointer"
          >
            try another email
          </button>.
        </p>

        <div className="pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to sign in</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-card p-6 sm:p-8 shadow-[var(--shadow-xl)] border border-[var(--color-border)] rounded-[var(--radius-card)] bg-[var(--color-surface-raised)]">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Forgot password?
        </h2>
        <p className="text-xs text-[var(--color-text-muted)]">
          No worries! Enter your work email and we'll send you reset instructions.
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
                required: 'Work email address is required',
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="ds-btn ds-btn-primary w-full h-10 mt-2 text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending reset link...</span>
            </>
          ) : (
            <>
              <span>Send Reset Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );
}
