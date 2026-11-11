import type { ReactNode } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { site } from '@/config/site';
import { publicAuthenticationEnabled } from '@/lib/launch-scope';

export function AuthShell({ children }: { children: ReactNode }) {
  const t = useTranslations('auth');
  return <main id="main-content" className="auth-page">
    <section className="auth-page__story" aria-label={t('brandStoryLabel')}>
      <Link href="/" className="auth-page__logo" aria-label={t('backHome')}>
        <Image src={site.logoSloganPath} alt="" width={216} height={250} priority sizes="(max-width: 900px) 112px, 216px" unoptimized={site.logoSloganPath.startsWith('https://')} />
      </Link>
      <div className="auth-page__story-copy">
        <p className="auth-page__eyebrow">{t('eyebrow')}</p>
        <h1>{t('storyTitle')}</h1>
        <p>{t('storyDescription')}</p>
      </div>
      <span className="auth-page__story-note">{t('storyNote')}</span>
    </section>
    <section className="auth-page__form-side" aria-label={publicAuthenticationEnabled ? t('formLabel') : t('unavailableLabel')}>
      <div className="auth-card">{publicAuthenticationEnabled ? children : <header className="auth-card__heading"><p className="auth-card__eyebrow">VERQIA PILOT</p><h2>{t('unavailableTitle')}</h2><p>{t('unavailableDescription')}</p><p className="auth-config-note" role="note">{t('serviceNotConfigured')}</p></header>}</div>
    </section>
  </main>;
}
