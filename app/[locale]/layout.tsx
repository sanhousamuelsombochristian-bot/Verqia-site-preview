import type { Metadata } from 'next';
import { Inter, Instrument_Serif, Reenie_Beanie } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { AnimationProvider } from '@/components/layout/AnimationProvider';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { CookieConsentLoader } from '@/components/layout/CookieConsentLoader';
import { site } from '@/config/site';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { StickyMobileCta } from '@/components/layout/StickyMobileCta';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Header, Footer } from '@/components/navigation';
import { routing } from '@/i18n/routing';
import { indexingEnabled } from '@/lib/indexing';
import '@/styles/globals.css';
import '@/styles/auth.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' });
const reenie = Reenie_Beanie({ subsets: ['latin'], weight: '400', variable: '--font-reenie', display: 'swap' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common');
  return {
    ...(site.domain ? { metadataBase: new URL(site.domain) } : {}),
    title: { default: t('siteName'), template: `%s | ${t('siteName')}` },
    robots: { index: indexingEnabled, follow: indexingEnabled },
  };
}
export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations('common');
  return <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${instrument.variable} ${reenie.variable}`}>
    <body><NextIntlClientProvider messages={messages}><ThemeProvider><AnimationProvider><a className="skip-link" href="#main-content">{t('skip')}</a><noscript><style>{'.motion-reveal{opacity:1!important;transform:none!important}'}</style></noscript><ScrollProgress /><AnnouncementBar /><SmoothScroll><Header />{children}<StickyMobileCta /><ScrollToTop />{site.whatsapp && <WhatsAppButton />}<Footer /><CookieConsentLoader /></SmoothScroll></AnimationProvider></ThemeProvider></NextIntlClientProvider></body>
  </html>;
}
