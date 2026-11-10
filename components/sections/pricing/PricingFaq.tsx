'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
const keys = ['free', 'difference', 'change'] as const;
export function PricingFaq() {
  const t = useTranslations('pricingPage.faq');
  const [open, setOpen] = useState<string | null>(keys[0]);
  return <div className="pricing-faq">{keys.map((key) => <section className="pricing-faq__item" key={key}>
    <h3><button type="button" aria-expanded={open === key} aria-controls={`pricing-answer-${key}`} id={`pricing-question-${key}`} onClick={() => setOpen((current) => current === key ? null : key)}>{t(`questions.${key}`)}<ChevronDown aria-hidden="true" className={open === key ? 'is-open' : ''} /></button></h3>
    <div id={`pricing-answer-${key}`} role="region" aria-labelledby={`pricing-question-${key}`} hidden={open !== key}><p>{t(`answers.${key}`)}</p></div>
  </section>)}</div>;
}
