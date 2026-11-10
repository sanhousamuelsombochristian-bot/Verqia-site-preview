import type { LucideIcon } from 'lucide-react';
import { Activity, CircleDollarSign, CreditCard, FileText, LayoutDashboard, Repeat, ShieldAlert, TrendingUp, Users, Workflow } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { modules } from '@/config/modules';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { publicCommercialOfferEnabled } from '@/lib/launch-scope';

const moduleIcons: Record<string, LucideIcon> = {
  overview: LayoutDashboard,
  treasury: CircleDollarSign,
  invoices: FileText,
  clients: Users,
  collections: Repeat,
  risk: ShieldAlert,
  forecasts: TrendingUp,
  payments: CreditCard,
  automations: Workflow,
  events: Activity,
};

export function Modules() {
  const t = useTranslations();
  const page = useTranslations('modulesPage');
  return <section className="modules-section section-paper" aria-labelledby="modules-title">
    <div className="home-section__inner">
      <SectionLabel>{page('eyebrow')}</SectionLabel>
      <header className="modules-section__header"><h1 id="modules-title">{page('title')}</h1><p>{page('subtitle')}</p></header>
      <div className="modules-grid">
        {modules.map((item, index) => {
          const Icon = moduleIcons[item.id] ?? Activity;
          return <article className="module-card" id={`module-${item.id}`} key={item.id}>
            <div className="module-card__top"><span className="module-card__number">{String(index + 1).padStart(2, '0')}</span><span className="module-card__icon" aria-hidden="true"><Icon size={20} strokeWidth={1.6} /></span></div>
            <h2>{t(item.titleKey)}</h2>
            <p className="module-card__description">{t(item.descriptionKey)}</p>
            {publicCommercialOfferEnabled && <div className="module-card__availability"><span>{page('availableFrom', { plan: item.availableFrom.toUpperCase() })}</span></div>}
            {item.accessNoteKey && <p className="module-card__access-note">{t(item.accessNoteKey)}</p>}
          </article>;
        })}
      </div>
    </div>
  </section>;
}
