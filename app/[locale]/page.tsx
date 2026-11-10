import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero, VideoShowcase, Problem, Solution, EngineTeaser, FinalCta } from '@/components/sections/home';
import { localizedMetadata } from '@/lib/seo';
import { HomeJsonLd } from '@/components/seo/HomeJsonLd';
type HomePageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations('home.hero');
  return localizedMetadata(locale, '/', t('metadataTitle'), t('subtitle'));
}
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations('home.hero');
  return <><HomeJsonLd description={t('subtitle')} /><main id="main-content" className="home-page">
    <Hero /><VideoShowcase /><Problem /><Solution /><EngineTeaser /><FinalCta />
  </main></>;
}
