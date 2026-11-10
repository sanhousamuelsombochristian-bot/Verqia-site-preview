'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const DecisionDemo = dynamic(() => import('./DecisionDemo').then((module) => module.DecisionDemo), {
  ssr: false,
  loading: () => <div className="deferred-demo-skeleton" aria-hidden="true" />,
});

export function DeferredDecisionDemo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !('IntersectionObserver' in window)) { setShouldLoad(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); }
    }, { rootMargin: '400px 0px' });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);
  return <div ref={hostRef} className="deferred-demo-host">{shouldLoad ? <DecisionDemo /> : <div className="deferred-demo-skeleton" aria-hidden="true" />}</div>;
}
