// filepath: src/pages/deals/DealsPage.jsx
// CRM Sales Pipeline page — Kanban board with Drag & Drop, pipeline metrics, Add/Edit/Delete modals, and Deal Details drawer.
import { useState, useMemo } from 'react';
import { Plus, DollarSign, Briefcase, TrendingUp, Target } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { INITIAL_DEALS, PIPELINE_STAGES } from '@/features/deals/data/mockDealsData.js';
import { DealKanban } from '@/features/deals/DealKanban.jsx';
import { DealFormModal } from '@/features/deals/DealFormModal.jsx';
import { DeleteDealModal } from '@/features/deals/DeleteDealModal.jsx';
import { DealDetailsDrawer } from '@/features/deals/DealDetailsDrawer.jsx';

export default function DealsPage() {
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [defaultStage, setDefaultStage] = useState('New');

  // Modals & Drawer
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingDeal, setDeletingDeal] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [viewingDeal, setViewingDeal] = useState(null);

  // Group deals by pipeline stage
  const dealsByStage = useMemo(() => {
    return PIPELINE_STAGES.reduce((acc, stage) => {
      acc[stage.id] = deals.filter((d) => d.stage === stage.id);
      return acc;
    }, {});
  }, [deals]);

  // Pipeline metrics
  const totalPipelineValue = useMemo(
    () =>
      deals
        .filter((d) => !['Won', 'Lost'].includes(d.stage))
        .reduce((acc, curr) => acc + curr.value, 0),
    [deals]
  );
  const wonValue = useMemo(
    () =>
      deals
        .filter((d) => d.stage === 'Won')
        .reduce((acc, curr) => acc + curr.value, 0),
    [deals]
  );
  const activeDealCount = deals.filter(
    (d) => !['Won', 'Lost'].includes(d.stage)
  ).length;

  // --- Drag and Drop Handler ---
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a droppable
    if (!destination) return;
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const newStage = destination.droppableId;
    const movedDeal = deals.find((d) => d.id === draggableId);
    if (!movedDeal) return;

    // Optimistic UI update
    setDeals((prev) => {
      // Remove from source, insert at destination within stage ordering
      const withoutMoved = prev.filter((d) => d.id !== draggableId);
      const stageDeals = withoutMoved.filter((d) => d.stage === newStage);
      stageDeals.splice(destination.index, 0, { ...movedDeal, stage: newStage });
      const otherDeals = withoutMoved.filter((d) => d.stage !== newStage);
      return [...otherDeals, ...stageDeals];
    });

    if (movedDeal.stage !== newStage) {
      toast.success(`"${movedDeal.title}" moved to ${newStage}`);
    }

    // Keep viewing deal in sync if open
    if (viewingDeal && viewingDeal.id === draggableId) {
      setViewingDeal((prev) => ({ ...prev, stage: newStage }));
    }
  };

  // --- CRUD Handlers ---
  const handleCreateDeal = (data) => {
    const newDeal = {
      ...data,
      id: `DEAL-${200 + deals.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDeals((prev) => [newDeal, ...prev]);
    toast.success(`Deal "${newDeal.title}" added to ${newDeal.stage}!`);
  };

  const handleUpdateDeal = (updatedData) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === updatedData.id ? { ...d, ...updatedData } : d))
    );
    if (viewingDeal && viewingDeal.id === updatedData.id) {
      setViewingDeal((prev) => ({ ...prev, ...updatedData }));
    }
    toast.success(`Deal "${updatedData.title}" updated!`);
  };

  const handleDeleteDeal = (id) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
    toast.success('Deal removed from pipeline');
  };

  const handleStageChange = (id, newStage) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, stage: newStage } : d))
    );
    if (viewingDeal && viewingDeal.id === id) {
      setViewingDeal((prev) => ({ ...prev, stage: newStage }));
    }
    toast.success(`Deal moved to ${newStage}`);
  };

  const handleAddDealToStage = (stageId) => {
    setDefaultStage(stageId);
    setEditingDeal(null);
    setFormModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full gap-6 pb-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Sales Pipeline
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Drag & drop deals across pipeline stages to track your sales progress
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingDeal(null);
            setDefaultStage('New');
            setFormModalOpen(true);
          }}
          className="ds-btn ds-btn-primary text-xs h-9 px-4 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Deal</span>
        </button>
      </div>

      {/* Pipeline Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Active Deals</p>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">
              {activeDealCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Pipeline Value</p>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">
              ${totalPipelineValue.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Closed Won</p>
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              ${wonValue.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="ds-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">Total Stages</p>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-0.5">
              {PIPELINE_STAGES.length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 min-h-0">
        <DealKanban
          dealsByStage={dealsByStage}
          onDragEnd={handleDragEnd}
          onAddDealToStage={handleAddDealToStage}
          onViewDetails={(deal) => {
            setViewingDeal(deal);
            setDrawerOpen(true);
          }}
          onEditDeal={(deal) => {
            setEditingDeal(deal);
            setFormModalOpen(true);
          }}
          onDeleteDeal={(deal) => {
            setDeletingDeal(deal);
            setDeleteModalOpen(true);
          }}
        />
      </div>

      {/* Add / Edit Deal Modal */}
      <DealFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingDeal(null);
        }}
        onSubmit={editingDeal ? handleUpdateDeal : handleCreateDeal}
        initialData={editingDeal}
        defaultStage={defaultStage}
      />

      {/* Delete Confirmation Modal */}
      <DeleteDealModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingDeal(null);
        }}
        onConfirm={handleDeleteDeal}
        deal={deletingDeal}
      />

      {/* Deal Details Drawer */}
      <DealDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setViewingDeal(null);
        }}
        deal={viewingDeal}
        onEdit={(deal) => {
          setEditingDeal(deal);
          setFormModalOpen(true);
        }}
        onDelete={(deal) => {
          setDeletingDeal(deal);
          setDeleteModalOpen(true);
        }}
        onStageChange={handleStageChange}
      />
    </div>
  );
}
