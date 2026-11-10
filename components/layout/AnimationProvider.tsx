'use client';

import type { ReactNode } from 'react';
import { LazyMotion } from 'motion/react';

const loadAnimationFeatures = () => import('@/lib/motion-features').then((module) => module.default);

export function AnimationProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadAnimationFeatures} strict>{children}</LazyMotion>;
}
