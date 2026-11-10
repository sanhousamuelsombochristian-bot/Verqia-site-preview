'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('errors');
  return <main id="main-content" className="error-page" role="alert"><div className="home-section__inner">
    <p className="error-page__code">!</p>
    <h1>{t('errorTitle')}</h1>
    <p>{t('errorBody')}</p>
    <Button onClick={reset}>{t('retry')}</Button>
  </div></main>;
}
