import { ArrowUpRight, CalendarDays, Mail, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { site } from '@/config/site';
import { buildCalendlyHref, buildEmailHref, buildWhatsAppHref } from './contact-links';

type Channel = { key: 'whatsapp' | 'email' | 'calendly'; href: string; icon: typeof MessageCircle };

export function ContactChannels({ source }: { source: string | null }) {
  const t = useTranslations('contact');
  const sourceLine = source ? t('sourceLine', { source }) : null;
  const channels: (Channel | null)[] = [
    site.whatsapp ? (() => { const href = buildWhatsAppHref(site.whatsapp, t('whatsappPrefill'), source, sourceLine); return href ? { key: 'whatsapp', href, icon: MessageCircle } : null; })() : null,
    site.email ? (() => { const subject = source ? t('emailSubjectWithSource', { source }) : t('emailSubject'); const href = buildEmailHref(site.email, subject, t('emailPrefill'), sourceLine); return href ? { key: 'email', href, icon: Mail } : null; })() : null,
    site.calendly ? (() => { const href = buildCalendlyHref(site.calendly, source); return href ? { key: 'calendly', href, icon: CalendarDays } : null; })() : null,
  ];
  const available = channels.filter((channel): channel is Channel => channel !== null);

  if (available.length === 0) {
    return <div className="contact-channels__empty"><p>{t('channelsMissing')}</p></div>;
  }

  return <div className="contact-channels">
    {available.map(({ key, href, icon: Icon }) => <a className="contact-channel" href={href} key={key} target="_blank" rel="noopener noreferrer">
      <span className="contact-channel__icon" aria-hidden="true"><Icon size={21} strokeWidth={1.8} /></span>
      <span className="contact-channel__copy"><strong>{t(`channels.${key}`)}</strong><small>{t('newTab')}</small></span>
      <ArrowUpRight className="contact-channel__arrow" size={18} aria-hidden="true" />
    </a>)}
  </div>;
}
