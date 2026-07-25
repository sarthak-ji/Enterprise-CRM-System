// filepath: src/features/deals/KanbanColumn.jsx
// Droppable Kanban column container representing a Sales Pipeline stage.
import { Droppable } from '@hello-pangea/dnd';
import { DealCard } from './DealCard.jsx';
import { Plus, DollarSign } from 'lucide-react';
import { cn } from '@/utils/cn.js';

export const KanbanColumn = ({
  stage,
  deals = [],
  onAddDealToStage,
  onViewDetails,
  onEditDeal,
  onDeleteDeal,
}) => {
  const columnTotalValue = deals.reduce((acc, curr) => acc + (curr.value || 0), 0);

  return (
    <div className="flex flex-col w-72 sm:w-80 shrink-0 rounded-[var(--radius-card)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] max-h-full">
      {/* Column Header */}
      <div className="p-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] rounded-t-[var(--radius-card)] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Stage indicator pill */}
            <span
              className={cn(
                'px-2.5 py-0.5 rounded-full text-xs font-bold border',
                stage.color
              )}
            >
              {stage.label}
            </span>
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">
              {deals.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAddDealToStage(stage.id)}
            className="p-1 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] transition-colors"
            title={`Add deal to ${stage.label}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Total stage value */}
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] pt-1 border-t border-[var(--color-border)]">
          <span>Stage Total</span>
          <span className="font-bold text-[var(--color-text-primary)]">
            ${columnTotalValue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'p-3 flex-1 overflow-y-auto min-h-[420px] space-y-3 transition-colors duration-200',
              snapshot.isDraggingOver && 'bg-brand-50/40 dark:bg-brand-950/20'
            )}
          >
            {deals.map((deal, index) => (
              <DealCard
                key={deal.id}
                deal={deal}
                index={index}
                onViewDetails={onViewDetails}
                onEditDeal={onEditDeal}
                onDeleteDeal={onDeleteDeal}
              />
            ))}

            {provided.placeholder}

            {deals.length === 0 && !snapshot.isDraggingOver && (
              <div className="h-32 border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-card)] flex flex-col items-center justify-center p-4 text-center text-xs text-[var(--color-text-muted)]">
                <span>No deals in {stage.label}</span>
                <button
                  type="button"
                  onClick={() => onAddDealToStage(stage.id)}
                  className="mt-2 text-[11px] font-semibold text-brand-600 hover:underline"
                >
                  + Add Deal
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
