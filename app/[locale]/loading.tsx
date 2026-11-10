import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('loading');
  return <main id="main-content" className="route-skeleton" aria-busy="true">
    <span className="sr-only">{t('label')}</span>
    <div className="route-skeleton__line route-skeleton__line--short" />
    <div className="route-skeleton__line route-skeleton__line--title" />
    <div className="route-skeleton__line route-skeleton__line--wide" />
    <div className="route-skeleton__cards"><span /><span /><span /></div>
  </main>;
}
