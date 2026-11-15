'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motionConfig } from '@/config/motion';
import { Badge } from '@/components/ui/Badge';

type Bubble = { label: string; title: string; body: string };

export function GuidedRelance() {
  const t = useTranslations('demoPage.guidedRelance');
  const reduceMotion = Boolean(useReducedMotion());
  const bubbles = t.raw('bubbles') as Bubble[];
  const [visible, setVisible] = useState(1);
  const timers = useRef<number[]>([]);
  const displayed = reduceMotion ? bubbles.length : visible;

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const schedule = useCallback(() => {
    motionConfig.guidedRelance.delays.slice(1).forEach((delay, index) => {
      timers.current.push(window.setTimeout(() => setVisible(index + 2), delay));
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return clearTimers;
    schedule();
    return clearTimers;
  }, [clearTimers, reduceMotion, schedule]);

  function replay() {
    clearTimers();
    if (reduceMotion) {
      setVisible(bubbles.length);
      return;
    }
    setVisible(1);
    schedule();
  }

  return <section className="guided-relance" aria-labelledby="guided-relance-title">
    <div className="guided-relance__heading">
      <div>
        <p className="guided-relance__eyebrow">{t('eyebrow')}</p>
        <h2 id="guided-relance-title">{t('title')}</h2>
        <p>{t('description')}</p>
      </div>
      <Badge>{t('fictional')}</Badge>
    </div>
    <ol className="guided-relance__bubbles" aria-live="polite" aria-label={t('liveLabel')}>
      {bubbles.slice(0, displayed).map((bubble) => <li className="guided-relance__bubble is-visible" key={bubble.label}>
        <span>{bubble.label}</span>
        <div><h3>{bubble.title}</h3><p>{bubble.body}</p></div>
      </li>)}
    </ol>
    <div className="guided-relance__footer">
      <button className="guided-relance__replay" type="button" onClick={replay}>
        <RotateCcw size={15} aria-hidden="true" />{t('replay')}
      </button>
    </div>
  </section>;
}
