'use client';

import * as m from 'motion/react-m';

export function NavIndicator({ active, reducedMotion = false }: { active: boolean; reducedMotion?: boolean }) {
  if (!active) return null;
  if (reducedMotion) return <span className="nav-indicator nav-indicator--static" aria-hidden="true" />;
  return <m.span className="nav-indicator" layoutId="verqia-nav-indicator" transition={{ type: 'spring', stiffness: 480, damping: 38 }} aria-hidden="true" />;
}
