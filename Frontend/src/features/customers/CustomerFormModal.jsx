// filepath: src/features/customers/CustomerFormModal.jsx
// Add / Edit Customer Modal form using React Hook Form and validation rules.
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal.jsx';
import { cn } from '@/utils/cn.js';

export const CustomerFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      industry: 'Software',
      companySize: '50-100 employees',
      website: '',
      address: '',
      tier: 'Professional',
      status: 'Active',
      totalSpent: 25000,
      accountManager: 'Alex Rivera',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          name: '',
          company: '',
          email: '',
          phone: '',
          industry: 'Enterprise Software',
          companySize: '100-250 employees',
          website: '',
          address: '',
          tier: 'Professional',
          status: 'Active',
          totalSpent: 25000,
          accountManager: 'Alex Rivera',
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit({
      ...data,
      totalSpent: Number(data.totalSpent),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Customer Account' : 'Add New Customer'}
      subtitle={
        isEditing
          ? `Updating account details for ${initialData?.company}`
          : 'Enter organization contact and subscription details'
      }
      size="lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="ds-btn ds-btn-secondary text-xs h-9 px-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="customer-form"
            disabled={isSubmitting}
            className="ds-btn ds-btn-primary text-xs h-9 px-5"
          >
            {isSubmitting
              ? isEditing
                ? 'Saving...'
                : 'Creating...'
              : isEditing
              ? 'Save Account'
              : 'Add Customer'}
          </button>
        </>
      }
    >
      <form
        id="customer-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Primary Contact Name */}
          <div>
            <label className="ds-label text-xs font-semibold">Primary Contact Name *</label>
            <input
              type="text"
              placeholder="e.g. Eleanor Vance"
              {...register('name', { required: 'Contact name is required' })}
              className={cn('ds-input text-xs', errors.name && 'ds-input-error')}
            />
            {errors.name && <p className="ds-error text-[11px]">{errors.name.message}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label className="ds-label text-xs font-semibold">Company Name *</label>
            <input
              type="text"
              placeholder="e.g. Acme Global Tech"
              {...register('company', { required: 'Company is required' })}
              className={cn('ds-input text-xs', errors.company && 'ds-input-error')}
            />
            {errors.company && <p className="ds-error text-[11px]">{errors.company.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="ds-label text-xs font-semibold">Email Address *</label>
            <input
              type="email"
              placeholder="eleanor@acmeglobal.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={cn('ds-input text-xs', errors.email && 'ds-input-error')}
            />
            {errors.email && <p className="ds-error text-[11px]">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="ds-label text-xs font-semibold">Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...register('phone')}
              className="ds-input text-xs"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="ds-label text-xs font-semibold">Industry</label>
            <input
              type="text"
              placeholder="e.g. Enterprise Software"
              {...register('industry')}
              className="ds-input text-xs"
            />
          </div>

          {/* Company Size */}
          <div>
            <label className="ds-label text-xs font-semibold">Company Size</label>
            <select {...register('companySize')} className="ds-input text-xs">
              <option value="1-20 employees">1-20 employees</option>
              <option value="20-50 employees">20-50 employees</option>
              <option value="50-100 employees">50-100 employees</option>
              <option value="100-250 employees">100-250 employees</option>
              <option value="250-500 employees">250-500 employees</option>
              <option value="500+ employees">500+ employees</option>
            </select>
          </div>

          {/* Plan Tier */}
          <div>
            <label className="ds-label text-xs font-semibold">Plan Tier</label>
            <select {...register('tier')} className="ds-input text-xs">
              <option value="Enterprise">Enterprise</option>
              <option value="Professional">Professional</option>
              <option value="Starter">Starter</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="ds-label text-xs font-semibold">Account Status</label>
            <select {...register('status')} className="ds-input text-xs">
              <option value="Active">Active</option>
              <option value="At-Risk">At-Risk</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Total Spent (LTV) */}
          <div>
            <label className="ds-label text-xs font-semibold">Lifetime Revenue / Spent ($)</label>
            <input
              type="number"
              placeholder="50000"
              min={0}
              {...register('totalSpent')}
              className="ds-input text-xs"
            />
          </div>

          {/* Account Manager */}
          <div>
            <label className="ds-label text-xs font-semibold">Account Manager</label>
            <select {...register('accountManager')} className="ds-input text-xs">
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Jessica Taylor">Jessica Taylor</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Elena Rostova">Elena Rostova</option>
            </select>
          </div>
        </div>

        {/* Website & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="ds-label text-xs font-semibold">Website URL</label>
            <input
              type="text"
              placeholder="https://company.com"
              {...register('website')}
              className="ds-input text-xs"
            />
          </div>

          <div>
            <label className="ds-label text-xs font-semibold">Office Address</label>
            <input
              type="text"
              placeholder="100 Innovation Way, CA"
              {...register('address')}
              className="ds-input text-xs"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
