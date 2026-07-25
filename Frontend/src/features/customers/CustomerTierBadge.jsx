// filepath: src/features/customers/CustomerTierBadge.jsx
// Helper Badge for Customer Plan Tiers (Enterprise, Professional, Starter).
import { memo } from 'react';
import { Badge } from '@/components/ui/Badge.jsx';

export const CustomerTierBadge = memo(({ tier, size = 'sm' }) => {
  const getTone = (t) => {
    switch (t?.toLowerCase()) {
      case 'enterprise':
        return 'brand';
      case 'professional':
        return 'info';
      case 'starter':
      default:
        return 'neutral';
    }
  };

  return (
    <Badge tone={getTone(tier)} size={size}>
      {tier || 'Starter'}
    </Badge>
  );
});

CustomerTierBadge.displayName = 'CustomerTierBadge';
