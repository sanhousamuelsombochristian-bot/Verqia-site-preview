'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export function ScrollProgress() {
  const t = useTranslations('scroll');
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(progress));
      progressRef.current?.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={progressRef} className="scroll-progress" role="progressbar" aria-label={t('progressLabel')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><span /></div>;
}
