'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { motionConfig } from '@/config/motion';
import { getLenis, setLenis } from '@/lib/smooth-scroll';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    let frame = 0;

    const raf = (time: number) => {
      frame = 0;
      if (!lenis || document.hidden) return;
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    const startFrameLoop = () => {
      if (lenis && !document.hidden && frame === 0) frame = requestAnimationFrame(raf);
    };
    const destroyLenis = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };
    const createLenis = () => {
      if (lenis || reducedMotion.matches) return;
      lenis = new Lenis({
        ...motionConfig.scroll,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -80, duration: 1.2 },
        prevent: (node) => node.classList.contains('skip-link'),
      });
      setLenis(lenis);
      startFrameLoop();
    };
    const handleMotionPreference = () => reducedMotion.matches ? destroyLenis() : createLenis();
    const handleVisibility = () => {
      if (document.hidden) {
        document.documentElement.dataset.pageHidden = 'true';
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      } else {
        delete document.documentElement.dataset.pageHidden;
        startFrameLoop();
      }
    };

    createLenis();
    handleVisibility();
    reducedMotion.addEventListener('change', handleMotionPreference);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      reducedMotion.removeEventListener('change', handleMotionPreference);
      document.removeEventListener('visibilitychange', handleVisibility);
      delete document.documentElement.dataset.pageHidden;
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    const instance = getLenis();
    if (instance) instance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
