'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';

export function ParallaxLayer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  return <m.div ref={ref} className="parallax-layer" style={{ y: reduce ? '0%' : y }}>{children}</m.div>;
}
