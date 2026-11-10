'use client';

import dynamic from 'next/dynamic';

const CookieConsent = dynamic(() => import('./CookieConsent').then((module) => module.CookieConsent), { ssr: false });

export function CookieConsentLoader() {
  return <CookieConsent />;
}
