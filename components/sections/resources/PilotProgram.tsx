'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';

const steps = ['contact', 'scope', 'explore'] as const;

export function PilotProgram() {
  const t = useTranslations('pilotPage');
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const canContact = Boolean(site.email || site.whatsapp || site.calendly);
  const activeKey = steps[active];

  function moveTo(index: number) {
    setActive(index);
    tabsRef.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % steps.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index + steps.length - 1) % steps.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = steps.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    moveTo(nextIndex);
  }

  return <main id="main-content" className="pilot-page">
    <section className="pilot-hero" aria-labelledby="pilot-title">
      <div className="home-section__inner">
        <p className="pilot-page__eyebrow">{t('eyebrow')}</p>
        <h1 id="pilot-title">{t('title')}</h1>
        <p className="pilot-page__description">{t('description')}</p>
        <p className="pilot-page__terms">{t('offerStatus')} {t('terms')}</p>
        <div className="pilot-progress">
          <div className="pilot-steps" role="tablist" aria-label={t('tabsLabel')}>
            {steps.map((key, index) => <button
              key={key}
              type="button"
              role="tab"
              id={`pilot-tab-${key}`}
              className={`pilot-step${active === index ? ' is-active' : ''}`}
              aria-selected={active === index}
              aria-controls={`pilot-panel-${key}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => { tabsRef.current[index] = node; }}
            >
              <span className="pilot-step__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="pilot-step__title">{t(`steps.${key}.title`)}</span>
              <span className="pilot-step__description">{t(`steps.${key}.description`)}</span>
            </button>)}
          </div>
          <div
            key={activeKey}
            id={`pilot-panel-${activeKey}`}
            className="pilot-step-panel"
            role="tabpanel"
            aria-labelledby={`pilot-tab-${activeKey}`}
            aria-label={t('stepPanelLabel', { step: active + 1, count: steps.length })}
            tabIndex={0}
          >
            <span aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
            <div><h2>{t(`steps.${activeKey}.title`)}</h2><p>{t(`steps.${activeKey}.description`)}</p></div>
          </div>
        </div>
        {canContact && <div className="pilot-page__response"><Button href="/contact" source="pilot">{t('cta')}</Button></div>}
      </div>
    </section>
  </main>;
}
