// filepath: src/components/layout/NavGroup.jsx
// Visual section wrapper with optional label. Used for Primary and Secondary nav stacks.
import { cn } from '@/utils/cn.js';

export const NavGroup = ({ label, items, collapsed = false }) => (
  <div className="flex flex-col gap-1">
    {label && !collapsed && (
      <h3 className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
        {label}
      </h3>
    )}
    <ul className="flex flex-col gap-0.5 px-2">
      {items.map((item) => (
        <NavItemSlot key={item.id} item={item} collapsed={collapsed} />
      ))}
    </ul>
  </div>
);

// Indirection so a future "group" feature (collapsible sections, badges) only
// touches this file and not every callsite.
import { NavItem } from './NavItem.jsx';
const NavItemSlot = ({ item, collapsed }) => <NavItem item={item} collapsed={collapsed} />;
