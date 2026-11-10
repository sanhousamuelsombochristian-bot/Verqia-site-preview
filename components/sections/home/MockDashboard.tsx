import { ArrowUpRight, CircleDollarSign, FileText, LayoutDashboard, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { plans } from '@/config/plans';

export function MockDashboard({ variant = 'hero' }: { variant?: 'hero' | 'browser' }) {
  const t = useTranslations('home.dashboard');
  const brand = useTranslations('nav');
  const invoices = plans.free.invoices.value;
  const clients = plans.free.clients.value;
  const isBrowser = variant === 'browser';
  return <div className={`mock-dashboard${isBrowser ? ' mock-dashboard--browser' : ''}`} role="img" aria-label={t(isBrowser ? 'browserAlt' : 'alt')}>
    <div className="mock-dashboard__window" aria-hidden="true">
      <div className="mock-dashboard__chrome"><span /><span /><span /><b className={isBrowser ? 'mock-dashboard__url' : undefined}>{t(isBrowser ? 'browserUrl' : 'brandLabel')}</b><i>{t('fictional')}</i></div>
      <div className="mock-dashboard__body">
        <aside className="mock-dashboard__sidebar">
          <div className="mock-dashboard__monogram">V</div>
          <span className="mock-dashboard__side-active"><LayoutDashboard size={15} /></span>
          <span><FileText size={15} /></span>
          <span><Users size={15} /></span>
          <span><CircleDollarSign size={15} /></span>
        </aside>
        <div className="mock-dashboard__main">
          <div className="mock-dashboard__heading"><div><small>{t('workspace')}</small><strong>{t('overview')}</strong></div><span className="mock-dashboard__avatar">V</span></div>
          <div className="mock-dashboard__metrics">
            <div><span>{t('invoices')}</span><strong className="tabular-nums">{String(invoices).padStart(2, '0')}</strong><small>{t('fictitiousItems')}</small></div>
            <div><span>{t('clients')}</span><strong className="tabular-nums">{String(clients).padStart(2, '0')}</strong><small>{t('fictitiousItems')}</small></div>
          </div>
          <div className="mock-dashboard__list-head"><span>{t('recentItems')}</span><span>{t('viewAll')} <ArrowUpRight size={12} /></span></div>
          <div className="mock-dashboard__rows">
            {[1, 2, 3].map((item) => <div className="mock-dashboard__row" key={item}><span className="mock-dashboard__file"><FileText size={14} /></span><span>{t('invoice')} {String(item).padStart(2, '0')}</span><i /></div>)}
          </div>
        </div>
      </div>
    </div>
    {!isBrowser && <div className="mock-dashboard__phone" aria-hidden="true">
      <div className="mock-dashboard__phone-camera" />
      <span className="mock-dashboard__phone-kicker">{brand('brandName')}</span>
      <strong>{t('phoneTitle')}</strong>
      <small>{t('invoices')}</small>
      <div className="mock-dashboard__phone-card"><FileText size={14} /><span>{t('invoice')} 01</span><b /></div>
      <div className="mock-dashboard__phone-card"><FileText size={14} /><span>{t('invoice')} 02</span><b /></div>
      <p>{t('fictional')}</p>
    </div>}
  </div>;
}
