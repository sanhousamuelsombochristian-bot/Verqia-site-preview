import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('errors');
  return <main id="main-content" className="error-page"><div className="home-section__inner">
    <p className="error-page__code">404</p>
    <h1>{t('notFoundTitle')}</h1>
    <p>{t('notFoundBody')}</p>
    <Link className="button button--primary" href="/">{t('home')}<span className="button__icon" aria-hidden="true">→</span></Link>
  </div></main>;
}
