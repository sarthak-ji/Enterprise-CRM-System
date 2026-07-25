// filepath: src/features/customers/CustomerStatusBadge.jsx
// Helper Badge for Customer Statuses (Active, Inactive, At-Risk, Pending).
import { memo } from 'react';
import { Badge } from '@/components/ui/Badge.jsx';

export const CustomerStatusBadge = memo(({ status, size = 'md' }) => {
  const getTone = (s) => {
    switch (s?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'at-risk':
        return 'danger';
      case 'pending':
        return 'warning';
      case 'inactive':
      default:
        return 'neutral';
    }
  };

  return (
    <Badge tone={getTone(status)} dot size={size}>
      {status || 'Inactive'}
    </Badge>
  );
});

CustomerStatusBadge.displayName = 'CustomerStatusBadge';
