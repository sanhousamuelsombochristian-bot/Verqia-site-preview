'use client';

import type { ReactNode } from 'react';
import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { motionConfig } from '@/config/motion';

const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const reduceMotion = Boolean(useReducedMotion());
  const classes = `motion-reveal${className ? ` ${className}` : ''}`;

  // Motion's reduced-motion preference is resolved in the browser. Render the
  // same plain element on the server and during the first client render, then
  // add the entrance animation after hydration. This avoids SSR inline-style
  // mismatches for visitors who prefer reduced motion.
  if (!hydrated || reduceMotion) return <div className={classes}>{children}</div>;

  return <m.div
    className={classes}
    initial={{ opacity: 0, y: motionConfig.reveal.distance }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: motionConfig.reveal.once, amount: motionConfig.reveal.amount }}
    transition={{ duration: motionConfig.reveal.duration, delay, ease: motionConfig.reveal.ease }}
  >
    {children}
  </m.div>;
}
