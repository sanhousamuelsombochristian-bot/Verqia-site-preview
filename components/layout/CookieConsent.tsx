'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { COOKIE_SETTINGS_EVENT, consumeCookieSettingsRequest } from '@/lib/cookie-preferences';

type Preferences = { necessary: true; analytics: boolean; marketing: boolean };
const STORAGE_KEY = 'verqia-cookie-preferences-v1';
const defaults: Preferences = { necessary: true, analytics: false, marketing: false };

function readPreferences(): Preferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const value = parsed as Partial<Preferences>;
    return { necessary: true, analytics: value.analytics === true, marketing: value.marketing === true };
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const t = useTranslations('cookieConsent');
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(defaults);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = readPreferences();
      const pendingSettings = consumeCookieSettingsRequest();
      if (saved) setPreferences(saved);
      if (pendingSettings) { setEditing(true); setVisible(true); }
      else if (!saved) setVisible(true);
      setReady(true);
    });
    const openSettings = () => {
      consumeCookieSettingsRequest();
      const current = readPreferences();
      if (current) setPreferences(current);
      setEditing(true);
      setVisible(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const save = (value: Preferences) => {
    setPreferences(value);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch { /* Keep the preference for this session only. */ }
    setVisible(false);
    setEditing(false);
  };

  if (!ready || !visible) return null;
  return <aside className="cookie-consent" aria-labelledby="cookie-consent-title">
    <div className="cookie-consent__copy">
      <h2 id="cookie-consent-title">{t('title')}</h2>
      <p>{t('description')} <Link href="/legal/cookies">{t('policyLink')}</Link></p>
      {editing && <div className="cookie-consent__preferences">
        <label><input type="checkbox" checked disabled /> <span>{t('necessary')} <small>{t('alwaysOn')}</small></span></label>
        <label><input type="checkbox" checked={preferences.analytics} onChange={(event) => setPreferences((current) => ({ ...current, analytics: event.target.checked }))} /> <span>{t('analytics')}</span></label>
        <label><input type="checkbox" checked={preferences.marketing} onChange={(event) => setPreferences((current) => ({ ...current, marketing: event.target.checked }))} /> <span>{t('marketing')}</span></label>
      </div>}
    </div>
    <div className="cookie-consent__actions">
      {editing ? <button type="button" className="cookie-consent__button cookie-consent__button--primary" onClick={() => save(preferences)}>{t('save')}</button> : <>
        <button type="button" className="cookie-consent__button" onClick={() => save(defaults)}>{t('essentialOnly')}</button>
        <button type="button" className="cookie-consent__button" onClick={() => { setEditing(true); setPreferences(defaults); }}>{t('customize')}</button>
        <button type="button" className="cookie-consent__button cookie-consent__button--primary" onClick={() => save({ necessary: true, analytics: true, marketing: true })}>{t('acceptAll')}</button>
      </>}
    </div>
  </aside>;
}
