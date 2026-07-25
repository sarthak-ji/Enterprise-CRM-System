// filepath: src/features/deals/DealCard.jsx
// Draggable Deal Card component for Sales Pipeline Kanban board using @hello-pangea/dnd.
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, DollarSign, Building2, User, MoreHorizontal, Eye, Edit3, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge.jsx';
import { cn } from '@/utils/cn.js';

export const DealCard = ({
  deal,
  index,
  onViewDetails,
  onEditDeal,
  onDeleteDeal,
}) => {
  const getPriorityTone = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
      default:
        return 'neutral';
    }
  };

  const contactInitials = deal.contactName
    ? deal.contactName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const ownerInitials = deal.owner
    ? deal.owner
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'OW';

  return (
    <Draggable draggableId={deal.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'p-4 rounded-[var(--radius-card)] bg-[var(--color-surface-raised)] border border-[var(--color-border)] shadow-xs flex flex-col justify-between gap-3 group transition-all duration-200 select-none',
            snapshot.isDragging
              ? 'shadow-[var(--shadow-2xl)] ring-2 ring-brand-500 scale-[1.02] z-50 bg-[var(--color-surface)]'
              : 'hover:border-brand-300 hover:shadow-md'
          )}
        >
          {/* Header: Company & Priority Badge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Building2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                {deal.company}
              </span>
            </div>

            <Badge tone={getPriorityTone(deal.priority)} size="sm">
              {deal.priority}
            </Badge>
          </div>

          {/* Deal Title */}
          <h4
            onClick={() => onViewDetails(deal)}
            className="text-xs font-semibold text-[var(--color-text-secondary)] hover:text-brand-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {deal.title}
          </h4>

          {/* Value & Expected Close Date */}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-xs">
            <div className="flex items-center gap-1 font-bold text-brand-600 dark:text-brand-400">
              <DollarSign className="w-3.5 h-3.5 shrink-0" />
              <span>{deal.value?.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)]">
              <Calendar className="w-3 h-3 shrink-0" />
              <span>{deal.expectedCloseDate}</span>
            </div>
          </div>

          {/* Footer: Contact info & Owner avatar & Action Menu */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                {contactInitials}
              </div>
              <span className="text-[11px] text-[var(--color-text-muted)] truncate max-w-[100px]">
                {deal.contactName}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Owner Badge */}
              <div
                className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bold text-[9px] flex items-center justify-center shrink-0"
                title={`Owner: ${deal.owner}`}
              >
                {ownerInitials}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => onViewDetails(deal)}
                  className="p-1 text-[var(--color-text-muted)] hover:text-brand-600 transition-colors"
                  title="View details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onEditDeal(deal)}
                  className="p-1 text-[var(--color-text-muted)] hover:text-brand-600 transition-colors"
                  title="Edit deal"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteDeal(deal)}
                  className="p-1 text-[var(--color-text-muted)] hover:text-red-600 transition-colors"
                  title="Delete deal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
