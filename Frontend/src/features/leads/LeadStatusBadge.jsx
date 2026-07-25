// filepath: src/features/leads/LeadStatusBadge.jsx
// Helper Badge for Lead Statuses.
import { memo } from 'react';
import { Badge } from '@/components/ui/Badge.jsx';

export const LeadStatusBadge = memo(({ status, size = 'md' }) => {
  const getTone = (statusStr) => {
    switch (statusStr?.toLowerCase()) {
      case 'won':
      case 'qualified':
        return 'success';
      case 'proposal':
      case 'negotiation':
        return 'warning';
      case 'contacted':
        return 'info';
      case 'new':
        return 'brand';
      case 'lost':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <Badge tone={getTone(status)} dot size={size}>
      {status || 'Unknown'}
    </Badge>
  );
});

LeadStatusBadge.displayName = 'LeadStatusBadge';
