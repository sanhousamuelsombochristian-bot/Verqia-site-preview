import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AuthShell } from '@/components/auth/AuthShell';
import { ResetPasswordForm } from '@/components/auth/AuthForms';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations('auth');
  return { title: t('unavailableTitle'), robots: { index: false, follow: false} };
}
export default async function ResetPasswordPage({ params }: Props) {
  const { locale } = await params; setRequestLocale(locale);
  return <AuthShell><ResetPasswordForm /></AuthShell>;
}
