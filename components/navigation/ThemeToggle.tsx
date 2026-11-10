'use client';
import { useSyncExternalStore } from 'react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const t = useTranslations('nav');
  const dark = mounted ? resolvedTheme === 'dark' : true;
  return <button type="button" className="header-icon-button" onClick={() => setTheme(dark ? 'light' : 'dark')} aria-label={dark ? t('themeLight') : t('themeDark')} title={t('theme')}>
    {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
  </button>;
}
