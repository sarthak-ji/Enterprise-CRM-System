// filepath: src/features/customers/DeleteCustomerModal.jsx
// Confirmation Modal before removing a Customer record.
import { Modal } from '@/components/ui/Modal.jsx';
import { AlertTriangle } from 'lucide-react';

export const DeleteCustomerModal = ({
  isOpen,
  onClose,
  onConfirm,
  customer = null,
}) => {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Customer Account"
      size="sm"
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
            type="button"
            onClick={() => {
              onConfirm(customer.id);
              onClose();
            }}
            className="ds-btn ds-btn-danger text-xs h-9 px-4"
          >
            Delete Account
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4 py-2">
        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 dark:bg-red-950/80 dark:text-red-400 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 stroke-[2.25]" />
        </div>
        <div className="space-y-1 text-xs">
          <p className="font-semibold text-[var(--color-text-primary)] text-sm">
            Delete customer <span className="text-red-600">{customer.company}</span>?
          </p>
          <p className="text-[var(--color-text-muted)]">
            This will permanently remove contact records for <strong className="text-[var(--color-text-primary)]">{customer.name}</strong> and associated financial history (${customer.totalSpent?.toLocaleString()}).
          </p>
        </div>
      </div>
    </Modal>
  );
};
