'use client';
import { useTranslations } from 'next-intl';
import type { Status } from '@/config/plans';
import { Badge } from './Badge';
export function ToValidate({ status, label }: { status: Status; label?: string }) {
  const t = useTranslations('common');
  return status === 'toValidate' ? <Badge tone="validate">{label ?? t('validate')}</Badge> : null;
}
