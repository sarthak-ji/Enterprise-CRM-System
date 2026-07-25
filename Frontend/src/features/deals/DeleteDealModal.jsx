// filepath: src/features/deals/DeleteDealModal.jsx
// Confirmation modal before permanently removing a pipeline deal.
import { Modal } from '@/components/ui/Modal.jsx';
import { AlertTriangle } from 'lucide-react';

export const DeleteDealModal = ({ isOpen, onClose, onConfirm, deal = null }) => {
  if (!deal) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Deal"
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
              onConfirm(deal.id);
              onClose();
            }}
            className="ds-btn ds-btn-danger text-xs h-9 px-4"
          >
            Delete Permanently
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
            Delete <span className="text-red-600">"{deal.title}"</span>?
          </p>
          <p className="text-[var(--color-text-muted)]">
            This will permanently remove the{' '}
            <strong className="text-[var(--color-text-primary)]">
              ${deal.value?.toLocaleString()}
            </strong>{' '}
            deal with <strong>{deal.company}</strong> from your pipeline. This cannot be undone.
          </p>
        </div>
      </div>
    </Modal>
  );
};
