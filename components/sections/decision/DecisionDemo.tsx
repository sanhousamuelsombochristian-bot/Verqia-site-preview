'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motionConfig } from '@/config/motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';

type DecisionKey = 'proceed' | 'defer' | 'suspend' | 'exception';
type InvoiceCase = { id: string; decision: DecisionKey; reasonKey: string };
const cases: readonly InvoiceCase[] = [
  { id: '01', decision: 'proceed', reasonKey: 'reasons.proceed' },
  { id: '02', decision: 'defer', reasonKey: 'reasons.defer' },
  { id: '03', decision: 'suspend', reasonKey: 'reasons.suspend' },
  { id: '04', decision: 'exception', reasonKey: 'reasons.exception' },
];

export function DecisionDemo() {
  const t = useTranslations('decisionEngine.demo');
  const reduceMotion = Boolean(useReducedMotion());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const timerRef = useRef<number | null>(null);
  const selected = cases[selectedIndex];
  const activeIndex = analyzing ? pendingIndex : selectedIndex;

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  function select(index: number) {
    if (index === selectedIndex && !analyzing) return;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (reduceMotion) {
      setSelectedIndex(index);
      setPendingIndex(null);
      setAnalyzing(false);
      return;
    }
    setPendingIndex(index);
    setAnalyzing(true);
    timerRef.current = window.setTimeout(() => {
      setSelectedIndex(index);
      setPendingIndex(null);
      setAnalyzing(false);
      timerRef.current = null;
    }, motionConfig.decision.analyzeMs);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % cases.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index + cases.length - 1) % cases.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = cases.length - 1;
    if (nextIndex !== null) {
      event.preventDefault();
      select(nextIndex);
      buttonsRef.current[nextIndex]?.focus();
    }
  }

  return <section className="decision-demo section-dark" aria-labelledby="decision-demo-title">
    <div className="home-section__inner">
      <div className="decision-demo__heading"><div><SectionLabel>{t('eyebrow')}</SectionLabel><h2 id="decision-demo-title">{t('title')}</h2></div><Badge>{t('fictional')}</Badge></div>
      <div className="decision-demo__layout">
        <div className="decision-demo__cases"><p className="decision-demo__caption">{t('selectInvoice')}</p><div role="group" aria-label={t('selectInvoice')}>
          {cases.map((item, index) => <button
            className={`decision-demo__case${activeIndex === index ? ' is-active' : ''}`}
            type="button"
            key={item.id}
            aria-pressed={activeIndex === index}
            onClick={() => select(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => { buttonsRef.current[index] = node; }}
          >
            <span className="decision-demo__file" aria-hidden="true"><FileText size={17} /></span><span>{t('invoice')} {item.id}</span><ArrowRight size={16} aria-hidden="true" />
          </button>)}
        </div></div>
        <div className="decision-demo__result" aria-live="polite" aria-atomic="true" aria-busy={analyzing}>
          {analyzing
            ? <p className="decision-demo__analyzing">{t('analyzing')}</p>
            : <>
              <p className="decision-demo__result-label">{t('resultLabel')}</p>
              <h3>{t(`decisions.${selected.decision}`)}</h3>
              <p>{t(selected.reasonKey)}</p>
              <small>{t('explanationNote')}</small>
            </>}
        </div>
      </div>
    </div>
  </section>;
}
