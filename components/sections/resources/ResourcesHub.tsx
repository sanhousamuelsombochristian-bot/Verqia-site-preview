import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { resourceNav } from '@/config/nav';
import { ArrowUpRight } from 'lucide-react';
export function ResourcesHub() {
  const t = useTranslations('resourcesPage');
  const resources = resourceNav.filter((item) => item.ready);
  return <main id="main-content" className="resources-page"><section className="resources-hero" aria-labelledby="resources-title"><div className="home-section__inner"><p className="resources-hero__eyebrow">{t('eyebrow')}</p><h1 id="resources-title">{t('title')}</h1><p>{t('description')}</p><div className="resources-cards">{resources.map((item, index) => <Link href={item.href} className="resources-card" key={item.key}><span>{String(index + 1).padStart(2,'0')}</span><h2>{t(`items.${item.key}.title`)}</h2><p>{t(`items.${item.key}.description`)}</p><ArrowUpRight aria-hidden="true" /></Link>)}</div></div></section></main>;
}
