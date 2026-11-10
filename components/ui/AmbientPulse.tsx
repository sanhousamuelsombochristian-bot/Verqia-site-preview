'use client';

import { useEffect, useRef } from 'react';

export function AmbientPulse() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => element.dataset.inview = String(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <span ref={ref} className="home-hero__ambient" aria-hidden="true" />;
}
