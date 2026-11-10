import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { site } from '@/config/site';
import { buildWhatsAppHref } from '@/components/sections/contact-links';

export function WhatsAppButton() {
  const t = useTranslations('contact');
  if (!site.whatsapp) return null;
  const href = buildWhatsAppHref(site.whatsapp, t('whatsappPrefill'), null, null);
  if (!href) return null;
  return <a className="whatsapp-float" href={href} target="_blank" rel="noopener noreferrer" aria-label={t('floatingWhatsapp')}>
    <MessageCircle size={22} aria-hidden="true" /><span>{t('floatingWhatsapp')}</span>
  </a>;
}
