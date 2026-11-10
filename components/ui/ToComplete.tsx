'use client';
import { useTranslations } from 'next-intl';
import { Badge } from './Badge';
export function ToComplete({ label }: { label?: string }) {
  const t = useTranslations('common');
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_PLACEHOLDER_MODE !== 'true') return null;
  return <Badge tone="complete">{label ?? t('placeholder')}</Badge>;
}
