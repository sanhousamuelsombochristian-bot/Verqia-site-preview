'use client';
import { useRef } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { plans, type PlanKey, type Value } from '@/config/plans';
import { productNav } from '@/config/nav';
import { EditorialQuote } from '@/components/ui/EditorialQuote';
import { publicCommercialOfferEnabled } from '@/lib/launch-scope';

const planKeys = ['free', 'starter', 'business', 'enterprise'] as const;
type NumericQuota = Value<number>;
type QuotaRow = { id: 'users' | 'invoices' | 'clients'; value: NumericQuota; textKey: 'users' | 'invoicesTotal' | 'invoicesMonthly' | 'clientsTotal' | 'clients' };

function getQuotas(key: PlanKey): QuotaRow[] {
  if (key === 'enterprise') return [];
  const plan = plans[key];
  if (key === 'free') return [
    { id: 'users', value: plan.users, textKey: 'users' },
    { id: 'invoices', value: plan.invoices, textKey: 'invoicesTotal' },
    { id: 'clients', value: plan.clients, textKey: 'clientsTotal' },
  ];
  return [
    { id: 'users', value: plan.users, textKey: 'users' },
    { id: 'invoices', value: plan.invoices, textKey: 'invoicesMonthly' },
    { id: 'clients', value: plan.clients, textKey: 'clients' },
  ];
}

export function Journey() {
  const t = useTranslations('productHub');
  const nav = useTranslations('nav');
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 65%', 'end 65%'] });
  const productLinks = productNav.filter((item) => item.ready);

  if (!publicCommercialOfferEnabled) return <section className="product-journey section-dark" ref={containerRef} aria-labelledby="journey-title">
    <div className="home-section__inner"><div className="product-journey__heading"><p className="product-journey__eyebrow">{t('journeyEyebrow')}</p><h2 id="journey-title">{t('journeyUnavailableTitle')}</h2><p>{t('journeyUnavailableDescription')}</p></div>
      <div className="product-journey__links" aria-label={t('discoverMore')}>{productLinks.map((item) => <Link className="product-link-card" href={item.href} key={item.key}><span className="product-link-card__copy"><strong>{nav(item.key)}</strong><small>{nav(`dropdown.${item.key}`)}</small></span><span className="product-link-card__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span></Link>)}</div>
    </div>
  </section>;

  return <section className="product-journey section-dark" ref={containerRef} aria-labelledby="journey-title">
    <div className="home-section__inner">
      <div className="product-journey__heading"><p className="product-journey__eyebrow">{t('journeyEyebrow')}</p><h2 id="journey-title">{t('journeyTitle')}</h2></div>
      <div className="product-journey__timeline">
        <span className="product-journey__rail" aria-hidden="true" />
        <m.span className="product-journey__progress" aria-hidden="true" style={{ scaleY: reduceMotion ? 1 : scrollYProgress }} />
        <ol className="product-journey__stack">
          {planKeys.map((key, index) => {
            const quotas = getQuotas(key);
            const isEnterprise = key === 'enterprise';
            return <li className="product-journey__step" style={{ '--stack-index': index } as React.CSSProperties} key={key}>
              <article className={`journey-card${key === 'business' ? ' journey-card--featured' : ''}`}>
                <div className="journey-card__top"><span>{String(index + 1).padStart(2, '0')} / 04</span>{key === 'business' && <span className="journey-card__featured">{t('featured')}</span>}</div>
                <h3>{key.toUpperCase()}</h3>
                <div className="journey-card__body"><div><p className="journey-card__label">{t('whatYouGet')}</p><p className="journey-card__description">{t(`plans.${key}.description`)}</p></div>
                  <div className="journey-card__quota"><p className="journey-card__label">{t('quotas')}</p>
                    {isEnterprise ? <p className="journey-card__custom">{t('customQuota')}</p> : <ul>{quotas.map((quota) => <li key={quota.id}><Check size={14} aria-hidden="true" /><span>{t(`quota.${quota.textKey}`, { count: quota.value.value })}</span></li>)}</ul>}
                  </div>
                </div>
              </article>
            </li>;
          })}
        </ol>
      </div>
      <div className="product-journey__links" aria-label={t('discoverMore')}>
        {productLinks.map((item) => <Link className="product-link-card" href={item.href} key={item.key}>
          <span className="product-link-card__copy"><strong>{nav(item.key)}</strong><small>{nav(`dropdown.${item.key}`)}</small></span>
          <span className="product-link-card__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </Link>)}
      </div>
      <div className="product-journey__quote"><EditorialQuote id={2} /></div>
    </div>
  </section>;
}
