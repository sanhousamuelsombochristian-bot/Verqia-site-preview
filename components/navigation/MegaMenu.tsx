'use client';

import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { modules } from '@/config/modules';
import { plans, type PlanKey } from '@/config/plans';
import { publicCommercialOfferEnabled } from '@/lib/launch-scope';

const planKeys: readonly PlanKey[] = ['free', 'starter', 'business', 'enterprise'];
const decisionKeys = ['proceed', 'defer', 'suspend', 'exception'] as const;

type Props = { type: 'product' | 'offers' | 'engine'; mode?: 'desktop' | 'mobile'; onNavigate?: () => void };

function formatPrice(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-CI' : 'en-US', { maximumFractionDigits: 0 }).format(value);
}

export default function MegaMenu({ type, mode = 'desktop', onNavigate }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const nav = useTranslations('nav');
  const pricing = useTranslations('pricingPage');
  const modulesPage = useTranslations('modulesPage');
  const engine = useTranslations('decisionEngine');

  if (type === 'product') return <section className={`mega-menu mega-menu--product mega-menu--${mode}`} aria-labelledby="mega-menu-product-title">
    <header className="mega-menu__heading">
      <div><p>{nav('productMenuEyebrow')}</p><h2 id="mega-menu-product-title">{nav('productMenuTitle')}</h2></div>
      <Link href="/produit/modules" onClick={onNavigate}>{nav('viewModules')}<ArrowRight size={15} aria-hidden="true" /></Link>
    </header>
    <div className="mega-menu__modules">
      {modules.map((item, index) => <Link className="mega-module" href={`/produit/modules#module-${item.id}`} key={item.id} onClick={onNavigate}>
        <span className="mega-module__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <span className="mega-module__copy"><strong>{t(item.titleKey)}</strong><small>{t(item.descriptionKey)}</small>{publicCommercialOfferEnabled && <span className="mega-module__availability">{modulesPage('availableFrom', { plan: pricing(`plans.${item.availableFrom}.name`) })}</span>}</span>
        <ChevronRight className="mega-module__arrow" size={15} aria-hidden="true" />
      </Link>)}
    </div>
  </section>;

  if (type === 'offers') {
    if (!publicCommercialOfferEnabled) return <section className={`mega-menu mega-menu--offers mega-menu--${mode}`} aria-labelledby="mega-menu-offers-title">
      <header className="mega-menu__heading"><div><p>{nav('offersMenuEyebrow')}</p><h2 id="mega-menu-offers-title">{nav('offersUnavailableTitle')}</h2><small>{nav('offersUnavailableDescription')}</small></div>
        <Link href="/tarifs#pricing-title" onClick={onNavigate}>{nav('viewOffers')}<ArrowRight size={15} aria-hidden="true" /></Link>
      </header>
    </section>;
    return <section className={`mega-menu mega-menu--offers mega-menu--${mode}`} aria-labelledby="mega-menu-offers-title">
      <header className="mega-menu__heading">
        <div><p>{nav('offersMenuEyebrow')}</p><h2 id="mega-menu-offers-title">{nav('offersMenuTitle')}</h2><small>{nav('priceDisclaimer')}</small></div>
        <Link href="/tarifs#pricing-title" onClick={onNavigate}>{nav('viewOffers')}<ArrowRight size={15} aria-hidden="true" /></Link>
      </header>
      <div className="mega-menu__plans">
        {planKeys.map((key) => {
          if (key === 'enterprise') return <Link className="mega-plan" href="/tarifs#plan-enterprise" key={key} onClick={onNavigate}>
            <span className="mega-plan__name">{pricing('plans.enterprise.name')}</span><strong>{pricing('quote')}</strong><ChevronRight size={14} aria-hidden="true" />
          </Link>;
          const price = plans[key].monthly;
          return <Link className="mega-plan" href={`/tarifs#plan-${key}`} key={key} onClick={onNavigate}>
            <span className="mega-plan__name">{pricing(`plans.${key}.name`)}</span>
            <strong>{formatPrice(price.value, locale)} <small>{pricing('pricePerMonth')}</small></strong>
            <ChevronRight size={14} aria-hidden="true" />
          </Link>;
        })}
      </div>
    </section>;
  }

  return <section className={`mega-menu mega-menu--engine mega-menu--${mode}`} aria-labelledby="mega-menu-engine-title">
    <header className="mega-menu__heading">
      <div><p>{nav('engineMenuEyebrow')}</p><h2 id="mega-menu-engine-title">{nav('engineMenuTitle')}</h2></div>
      <Link href="/produit/moteur-decisionnel#decision-title" onClick={onNavigate}>{nav('viewEngine')}<ArrowRight size={15} aria-hidden="true" /></Link>
    </header>
    <ul className="mega-menu__decisions">
      {decisionKeys.map((key) => <li key={key}><span aria-hidden="true"><Check size={14} /></span><div><strong>{engine(`decisions.${key}.title`)}</strong><small>{engine(`decisions.${key}.meaning`)}</small></div></li>)}
    </ul>
    <p className="mega-menu__access">{engine('accessLabel')} <strong>{engine('business')}</strong> {engine('and')} <strong>{engine('enterprise')}</strong></p>
  </section>;
}
