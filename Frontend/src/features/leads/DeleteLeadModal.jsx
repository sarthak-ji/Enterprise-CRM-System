// filepath: src/features/leads/DeleteLeadModal.jsx
// Confirmation Modal before permanently removing a lead record.
import { Modal } from '@/components/ui/Modal.jsx';
import { AlertTriangle } from 'lucide-react';

export const DeleteLeadModal = ({
  isOpen,
  onClose,
  onConfirm,
  lead = null,
}) => {
  if (!lead) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Lead"
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
              onConfirm(lead.id);
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
            Are you sure you want to delete lead <span className="text-red-600">{lead.name}</span>?
          </p>
          <p className="text-[var(--color-text-muted)]">
            This action will remove <strong className="text-[var(--color-text-primary)]">{lead.company}</strong> (${lead.value?.toLocaleString()}) from your pipeline. This cannot be undone.
          </p>
        </div>
      </div>
    </Modal>
  );
};
