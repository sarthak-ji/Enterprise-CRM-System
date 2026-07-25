// filepath: src/features/leads/LeadFormModal.jsx
// Add / Edit Lead Modal form using React Hook Form and validation rules.
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal.jsx';
import { cn } from '@/utils/cn.js';

export const LeadFormModal = ({
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
      value: 10000,
      status: 'New',
      priority: 'Medium',
      source: 'Website Organic',
      owner: 'Alex Rivera',
      notes: '',
    },
  });

  // Populate form values when editing or reset when adding
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
          value: 10000,
          status: 'New',
          priority: 'Medium',
          source: 'Website Organic',
          owner: 'Alex Rivera',
          notes: '',
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit({
      ...data,
      value: Number(data.value),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Lead Details' : 'Add New Lead'}
      subtitle={
        isEditing
          ? `Updating details for lead #${initialData?.id}`
          : 'Enter contact and deal information to add a new lead'
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
            form="lead-form"
            disabled={isSubmitting}
            className="ds-btn ds-btn-primary text-xs h-9 px-5"
          >
            {isSubmitting
              ? isEditing
                ? 'Saving...'
                : 'Creating...'
              : isEditing
              ? 'Save Changes'
              : 'Create Lead'}
          </button>
        </>
      }
    >
      <form
        id="lead-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="ds-label text-xs font-semibold">Contact Name *</label>
            <input
              type="text"
              placeholder="e.g. Sarah Connor"
              {...register('name', { required: 'Name is required' })}
              className={cn('ds-input text-xs', errors.name && 'ds-input-error')}
            />
            {errors.name && <p className="ds-error text-[11px]">{errors.name.message}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="ds-label text-xs font-semibold">Company Name *</label>
            <input
              type="text"
              placeholder="e.g. Cyberdyne Systems"
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
              placeholder="sarah@cyberdyne.com"
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

          {/* Estimated Value */}
          <div>
            <label className="ds-label text-xs font-semibold">Estimated Value ($)</label>
            <input
              type="number"
              placeholder="25000"
              min={0}
              {...register('value', { required: 'Value is required' })}
              className={cn('ds-input text-xs', errors.value && 'ds-input-error')}
            />
          </div>

          {/* Lead Source */}
          <div>
            <label className="ds-label text-xs font-semibold">Lead Source</label>
            <select {...register('source')} className="ds-input text-xs">
              <option value="Website Organic">Website Organic</option>
              <option value="Direct Sales">Direct Sales</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Email Campaigns">Email Campaigns</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="ds-label text-xs font-semibold">Status</label>
            <select {...register('status')} className="ds-input text-xs">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="ds-label text-xs font-semibold">Priority</label>
            <select {...register('priority')} className="ds-input text-xs">
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Lead Owner */}
        <div>
          <label className="ds-label text-xs font-semibold">Assigned Sales Owner</label>
          <select {...register('owner')} className="ds-input text-xs">
            <option value="Alex Rivera">Alex Rivera</option>
            <option value="Jessica Taylor">Jessica Taylor</option>
            <option value="Marcus Vance">Marcus Vance</option>
            <option value="Elena Rostova">Elena Rostova</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="ds-label text-xs font-semibold">Lead Notes & Context</label>
          <textarea
            rows={3}
            placeholder="Add relevant notes about client requirements or opportunity details..."
            {...register('notes')}
            className="ds-input text-xs resize-none"
          />
        </div>
      </form>
    </Modal>
  );
};
