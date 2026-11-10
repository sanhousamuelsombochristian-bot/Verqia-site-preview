'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { faqKeys } from '@/config/faq';
export function Faq() {
  const t = useTranslations('faqPage');
  const [open, setOpen] = useState<string | null>(faqKeys[0]);
  return <main id="main-content" className="faq-page"><div className="home-section__inner faq-page__inner"><header><p>{t('eyebrow')}</p><h1>{t('title')}</h1><span>{t('count', { count: faqKeys.length })}</span></header><div className="faq-list">{faqKeys.map((key, index) => <section className="faq-item" key={key}><h2><button type="button" id={`faq-question-${key}`} aria-expanded={open === key} aria-controls={`faq-answer-${key}`} onClick={() => setOpen((current) => current === key ? null : key)}><span className="faq-item__number">{String(index + 1).padStart(2,'0')}</span><span>{t(`items.${key}.question`)}</span><ChevronDown className={open === key ? 'is-open' : ''} aria-hidden="true" /></button></h2><div id={`faq-answer-${key}`} role="region" aria-labelledby={`faq-question-${key}`} hidden={open !== key}><p>{t(`items.${key}.answer`)}</p></div></section>)}</div></div></main>;
}
