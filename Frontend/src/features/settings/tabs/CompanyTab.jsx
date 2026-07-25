// filepath: src/features/settings/tabs/CompanyTab.jsx
// Company Settings Tab — Manage organization details, currency, domain, and tax registration.
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Building2, Globe, DollarSign, MapPin, Save, Loader2, Upload } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const CompanyTab = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: 'Acme Global Technologies Inc.',
      industry: 'Enterprise Software & Cloud Services',
      website: 'https://acmeglobal.com',
      taxId: 'US-987654321-VAT',
      currency: 'USD ($)',
      fiscalYear: 'January - December',
      address: '100 Innovation Way, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    toast.success('Company profile updated!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      {/* Branding & Logo */}
      <div className="ds-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-gradient-to-br from-brand-600 to-indigo-900 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
            AG
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              Company Branding & Logo
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Used in invoices, proposals, and customer emails.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toast.success('Company logo uploaded!')}
          className="ds-btn ds-btn-secondary text-xs h-9 px-4 gap-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Logo</span>
        </button>
      </div>

      {/* Organization Details */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          Organization Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company Name */}
          <div>
            <label className="ds-label text-xs font-semibold">Company Name *</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                {...register('companyName', { required: 'Company name is required' })}
                className={cn('ds-input pl-9 text-xs', errors.companyName && 'ds-input-error')}
              />
            </div>
            {errors.companyName && (
              <p className="ds-error text-[11px]">{errors.companyName.message}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="ds-label text-xs font-semibold">Industry Sector</label>
            <input type="text" {...register('industry')} className="ds-input text-xs" />
          </div>

          {/* Website */}
          <div>
            <label className="ds-label text-xs font-semibold">Company Website</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" {...register('website')} className="ds-input pl-9 text-xs" />
            </div>
          </div>

          {/* Tax / VAT Registration */}
          <div>
            <label className="ds-label text-xs font-semibold">Tax ID / VAT Registration</label>
            <input type="text" {...register('taxId')} className="ds-input text-xs" />
          </div>

          {/* Currency */}
          <div>
            <label className="ds-label text-xs font-semibold">Default Base Currency</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <select {...register('currency')} className="ds-input pl-9 text-xs">
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
                <option value="CAD ($)">CAD ($) - Canadian Dollar</option>
              </select>
            </div>
          </div>

          {/* Fiscal Year */}
          <div>
            <label className="ds-label text-xs font-semibold">Fiscal Year Period</label>
            <select {...register('fiscalYear')} className="ds-input text-xs">
              <option value="January - December">January - December</option>
              <option value="April - March">April - March</option>
              <option value="July - June">July - June</option>
              <option value="October - September">October - September</option>
            </select>
          </div>
        </div>
      </div>

      {/* HQ Address */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-500" />
          <span>Headquarters Address</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="ds-label text-xs font-semibold">Street Address</label>
            <input type="text" {...register('address')} className="ds-input text-xs" />
          </div>

          <div>
            <label className="ds-label text-xs font-semibold">City</label>
            <input type="text" {...register('city')} className="ds-input text-xs" />
          </div>

          <div>
            <label className="ds-label text-xs font-semibold">State / Province</label>
            <input type="text" {...register('state')} className="ds-input text-xs" />
          </div>

          <div>
            <label className="ds-label text-xs font-semibold">Postal / ZIP Code</label>
            <input type="text" {...register('zipCode')} className="ds-input text-xs" />
          </div>

          <div>
            <label className="ds-label text-xs font-semibold">Country</label>
            <input type="text" {...register('country')} className="ds-input text-xs" />
          </div>
        </div>
      </div>

      {/* Save Button */}
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
              <span>Save Company Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
