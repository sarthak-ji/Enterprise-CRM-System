// filepath: src/features/deals/DealFormModal.jsx
// Add / Edit Deal Modal form using React Hook Form with stage pre-selection support.
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal.jsx';
import { cn } from '@/utils/cn.js';

export const DealFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  defaultStage = 'New',
}) => {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          title: '',
          company: '',
          contactName: '',
          contactEmail: '',
          value: 25000,
          stage: defaultStage,
          priority: 'Medium',
          probability: '50%',
          expectedCloseDate: '',
          owner: 'Alex Rivera',
          notes: '',
        });
      }
    }
  }, [isOpen, initialData, defaultStage, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit({ ...data, value: Number(data.value) });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Deal' : 'Add New Deal'}
      subtitle={
        isEditing
          ? `Updating pipeline deal #${initialData?.id}`
          : 'Add a new deal to your sales pipeline'
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
            form="deal-form"
            disabled={isSubmitting}
            className="ds-btn ds-btn-primary text-xs h-9 px-5"
          >
            {isSubmitting
              ? isEditing ? 'Saving...' : 'Creating...'
              : isEditing ? 'Save Changes' : 'Create Deal'}
          </button>
        </>
      }
    >
      <form
        id="deal-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Deal Title */}
          <div className="sm:col-span-2">
            <label className="ds-label text-xs font-semibold">Deal Title *</label>
            <input
              type="text"
              placeholder="e.g. Enterprise Security Suite Deployment"
              {...register('title', { required: 'Deal title is required' })}
              className={cn('ds-input text-xs', errors.title && 'ds-input-error')}
            />
            {errors.title && <p className="ds-error text-[11px]">{errors.title.message}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="ds-label text-xs font-semibold">Company *</label>
            <input
              type="text"
              placeholder="e.g. Cyberdyne Systems"
              {...register('company', { required: 'Company is required' })}
              className={cn('ds-input text-xs', errors.company && 'ds-input-error')}
            />
            {errors.company && <p className="ds-error text-[11px]">{errors.company.message}</p>}
          </div>

          {/* Contact Name */}
          <div>
            <label className="ds-label text-xs font-semibold">Contact Name</label>
            <input
              type="text"
              placeholder="e.g. Sarah Connor"
              {...register('contactName')}
              className="ds-input text-xs"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="ds-label text-xs font-semibold">Contact Email</label>
            <input
              type="email"
              placeholder="sarah@company.com"
              {...register('contactEmail', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={cn('ds-input text-xs', errors.contactEmail && 'ds-input-error')}
            />
            {errors.contactEmail && (
              <p className="ds-error text-[11px]">{errors.contactEmail.message}</p>
            )}
          </div>

          {/* Deal Value */}
          <div>
            <label className="ds-label text-xs font-semibold">Deal Value ($) *</label>
            <input
              type="number"
              min={0}
              placeholder="50000"
              {...register('value', { required: 'Value is required' })}
              className={cn('ds-input text-xs', errors.value && 'ds-input-error')}
            />
            {errors.value && <p className="ds-error text-[11px]">{errors.value.message}</p>}
          </div>

          {/* Expected Close Date */}
          <div>
            <label className="ds-label text-xs font-semibold">Expected Close Date *</label>
            <input
              type="date"
              {...register('expectedCloseDate', { required: 'Close date is required' })}
              className={cn('ds-input text-xs', errors.expectedCloseDate && 'ds-input-error')}
            />
            {errors.expectedCloseDate && (
              <p className="ds-error text-[11px]">{errors.expectedCloseDate.message}</p>
            )}
          </div>

          {/* Pipeline Stage */}
          <div>
            <label className="ds-label text-xs font-semibold">Pipeline Stage</label>
            <select {...register('stage')} className="ds-input text-xs">
              <option value="New">New</option>
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

          {/* Win Probability */}
          <div>
            <label className="ds-label text-xs font-semibold">Win Probability</label>
            <select {...register('probability')} className="ds-input text-xs">
              <option value="10%">10%</option>
              <option value="25%">25%</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
              <option value="75%">75%</option>
              <option value="90%">90%</option>
              <option value="100%">100%</option>
            </select>
          </div>

          {/* Owner */}
          <div>
            <label className="ds-label text-xs font-semibold">Deal Owner</label>
            <select {...register('owner')} className="ds-input text-xs">
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Jessica Taylor">Jessica Taylor</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Elena Rostova">Elena Rostova</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="ds-label text-xs font-semibold">Deal Notes</label>
          <textarea
            rows={3}
            placeholder="Add context or key information about this deal opportunity..."
            {...register('notes')}
            className="ds-input text-xs resize-none"
          />
        </div>
      </form>
    </Modal>
  );
};
