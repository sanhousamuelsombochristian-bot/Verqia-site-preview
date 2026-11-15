'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useTranslations } from 'next-intl';
import { motionConfig } from '@/config/motion';

const words = ['centralize', 'prioritize', 'followUp', 'track'] as const;

export function HeroRotate() {
  const t = useTranslations('home.heroRotate');
  const reduceMotion = Boolean(useReducedMotion());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setIndex((current) => (current + 1) % words.length);
      }
    }, motionConfig.heroRotate.interval);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const activeWord = reduceMotion ? words[0] : words[index];

  return <p className="hero-rotate">
    <span className="hero-rotate__prefix">{t('prefix')}</span>
    <span className="hero-rotate__viewport" aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={activeWord}
          className="hero-rotate__word"
          initial={reduceMotion ? false : { opacity: 0, y: motionConfig.heroRotate.distance }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -motionConfig.heroRotate.distance }}
          transition={{ duration: motionConfig.heroRotate.duration, ease: motionConfig.heroRotate.ease }}
        >
          {t(`words.${activeWord}`)}
        </m.span>
      </AnimatePresence>
    </span>
    <span className="sr-only">{t('screenReaderSummary')}</span>
  </p>;
}
