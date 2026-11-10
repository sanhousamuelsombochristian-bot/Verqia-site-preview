'use client';
import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/components/layout/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { ToComplete } from './ToComplete';
import { ToValidate } from './ToValidate';
import { SectionLabel } from './SectionLabel';
import { AccentWord } from './AccentWord';
import { NumberedCard } from './NumberedCard';
import { EditorialQuote } from './EditorialQuote';
import { Accordion } from './Accordion';
import { Stepper } from './Stepper';
import { LockedFeature } from './LockedFeature';
import { MediaFrame } from './MediaFrame';
import { VideoPlayer } from './VideoPlayer';

const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

export function KitShowcase() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const dark = mounted ? theme === 'dark' : true;
  const steps = t.raw('kit.steps') as string[];
  return <main id="main-content" className="kit-page">
    <header className="kit-head"><SectionLabel>{t('kit.sectionLabel')}</SectionLabel><h1>{t('kit.title')}</h1><p>{t('kit.intro')}</p>
      <button type="button" className="theme-demo" onClick={() => setTheme(dark ? 'light' : 'dark')} aria-label={dark ? t('kit.themeLight') : t('kit.themeDark')}>{dark ? <Sun /> : <Moon />}</button>
    </header>
    <div className="kit-grid">
      <section className="kit-block"><h2>{t('kit.button')}</h2><Button>{t('kit.button')}</Button> <Button variant="secondary">{t('kit.secondary')}</Button></section>
      <section className="kit-block"><h2>{t('kit.badge')}</h2><Badge>{t('common.fakeData')}</Badge> <ToValidate status="toValidate" /> <ToComplete /></section>
      <section className="kit-block"><h2>{t('kit.accent')}</h2><p className="kit-display">VERQIA <AccentWord>PILOT</AccentWord></p></section>
      <section className="kit-block"><h2>{t('kit.card')}</h2><NumberedCard number={1} total={4} title={steps[0]}><p>{t('kit.placeholder')}</p></NumberedCard></section>
      <section className="kit-block"><h2>{t('kit.accordion')}</h2><Accordion label={t('kit.accordion')} items={[{ question: t('kit.faqTitle'), answer: t('kit.faqBody') }]} /></section>
      <section className="kit-block"><h2>{t('kit.stepper')}</h2><Stepper items={steps.map((title, i) => ({ title, description: <span>{String(i + 1).padStart(2, '0')}</span> }))} /></section>
      <section className="kit-block"><h2>{t('kit.locked')}</h2><LockedFeature plan="STARTER">{t('common.locked', { plan: 'STARTER' })}</LockedFeature></section>
      <section className="kit-block"><h2>{t('kit.media')}</h2><MediaFrame src={null} alt={t('common.mediaImage')} /><VideoPlayer src={null} poster={null} label={t('common.mediaVideo')} captionsFr={null} captionsEn={null} /></section>
      <section className="kit-block"><h2>{t('kit.quote')}</h2><EditorialQuote id={1} /></section>
    </div>
  </main>;
}
