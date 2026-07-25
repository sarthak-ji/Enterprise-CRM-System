// filepath: src/features/deals/DealKanban.jsx
// Main Kanban board using @hello-pangea/dnd with DragDropContext across all 6 pipeline stages.
import { DragDropContext } from '@hello-pangea/dnd';
import { KanbanColumn } from './KanbanColumn.jsx';
import { PIPELINE_STAGES } from './data/mockDealsData.js';

export const DealKanban = ({
  dealsByStage,
  onDragEnd,
  onAddDealToStage,
  onViewDetails,
  onEditDeal,
  onDeleteDeal,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Horizontal scroll container for Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1">
        {PIPELINE_STAGES.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            deals={dealsByStage[stage.id] || []}
            onAddDealToStage={onAddDealToStage}
            onViewDetails={onViewDetails}
            onEditDeal={onEditDeal}
            onDeleteDeal={onDeleteDeal}
          />
        ))}
      </div>
    </DragDropContext>
  );
};
