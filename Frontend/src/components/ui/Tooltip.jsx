// filepath: src/components/ui/Tooltip.jsx
// Lightweight CSS-only tooltip. No portal, no JS — the label renders on hover/focus.
// Keeps the bundle small while still giving the collapsed sidebar proper affordance.
import { useState, cloneElement } from 'react';
import { cn } from '@/utils/cn.js';

const sideMap = {
  right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  left:  'right-full mr-2 top-1/2 -translate-y-1/2',
  top:   'bottom-full mb-2 left-1/2 -translate-x-1/2',
  bottom:'top-full mt-2 left-1/2 -translate-x-1/2',
};

export const Tooltip = ({ children, content, side = 'right', className }) => {
  const [visible, setVisible] = useState(false);

  // Wrap the trigger so we can attach handlers without forcing a specific element
  const trigger = cloneElement(children, {
    onMouseEnter: (e) => { setVisible(true); children.props.onMouseEnter?.(e); },
    onMouseLeave: (e) => { setVisible(false); children.props.onMouseLeave?.(e); },
    onFocus:      (e) => { setVisible(true); children.props.onFocus?.(e); },
    onBlur:       (e) => { setVisible(false); children.props.onBlur?.(e); },
  });

  return (
    <span className="relative inline-flex">
      {trigger}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-50 px-2 py-1 rounded-[var(--radius-sm)]',
          'text-[11px] font-medium whitespace-nowrap',
          'bg-[var(--color-text-primary)] text-[var(--color-text-inverse)]',
          'shadow-[var(--shadow-lg)]',
          'transition-all duration-150 ease-out',
          sideMap[side],
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          className,
        )}
      >
        {content}
        {/* Tiny arrow on right-side tooltips */}
        {side === 'right' && (
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text-primary)]" />
        )}
      </span>
    </span>
  );
};
