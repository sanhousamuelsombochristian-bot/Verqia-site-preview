'use client';

import { useTranslations } from 'next-intl';
import { openCookiePreferences } from '@/lib/cookie-preferences';

export function CookiePreferencesButton() {
  const t = useTranslations('cookieConsent');
  return <button type="button" className="cookie-preferences-button" onClick={openCookiePreferences}>{t('manage')}</button>;
}
