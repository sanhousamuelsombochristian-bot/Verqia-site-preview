'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getLenis } from '@/lib/smooth-scroll';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('scroll');
  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>('#main-content h1');
    if (!sentinel || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0.05 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);
  if (!visible) return null;
  return <button className="scroll-to-top" type="button" aria-label={t('toTop')} onClick={() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }}><ArrowUp size={18} aria-hidden="true" /></button>;
}
