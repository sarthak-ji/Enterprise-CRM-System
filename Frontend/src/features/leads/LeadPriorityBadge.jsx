// filepath: src/features/leads/LeadPriorityBadge.jsx
// Helper Badge for Lead Priority levels.
import { memo } from 'react';
import { Badge } from '@/components/ui/Badge.jsx';

export const LeadPriorityBadge = memo(({ priority, size = 'sm' }) => {
  const getTone = (pStr) => {
    switch (pStr?.toLowerCase()) {
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

  return (
    <Badge tone={getTone(priority)} size={size}>
      {priority || 'Low'}
    </Badge>
  );
});

LeadPriorityBadge.displayName = 'LeadPriorityBadge';
