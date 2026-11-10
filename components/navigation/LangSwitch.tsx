'use client';

import type { MouseEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

export function LangSwitch({ onLocaleChange }: { onLocaleChange?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');
  const preserveHash = (target: 'fr' | 'en', event: MouseEvent<HTMLAnchorElement>) => {
    const hash = window.location.hash;
    if (target === locale) return;
    if (hash) {
      event.preventDefault();
      onLocaleChange?.();
      router.replace(`${pathname}${hash}`, { locale: target });
      return;
    }
    onLocaleChange?.();
  };
  return <nav className="lang-switch" aria-label={t('language')}>
    <Link href={pathname} locale="fr" aria-current={locale === 'fr' ? 'page' : undefined} onClick={(event) => preserveHash('fr', event)}>FR</Link>
    <span aria-hidden="true">/</span>
    <Link href={pathname} locale="en" aria-current={locale === 'en' ? 'page' : undefined} onClick={(event) => preserveHash('en', event)}>EN</Link>
  </nav>;
}
