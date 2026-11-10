import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/AuthForms';

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ remember?: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations('auth');
  return { title: t('unavailableTitle'), robots: { index: false, follow: false } };
}
export default async function LoginPage({ params, searchParams }: Props) {
  const [{ locale }, query] = await Promise.all([params, searchParams]); setRequestLocale(locale);
  return <AuthShell><LoginForm locale={locale} initialRemember={query.remember !== '0'} /></AuthShell>;
}
