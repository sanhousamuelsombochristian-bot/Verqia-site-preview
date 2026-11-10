import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { footerNav } from '@/config/nav';
import { site } from '@/config/site';
import { Brand } from './Brand';

function whatsappHref(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  const digits = value.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

export function Footer() {
  const t = useTranslations('footer');
  const columns = Object.entries(footerNav) as [keyof typeof footerNav, (typeof footerNav)[keyof typeof footerNav]][ ];
  const contacts = [
    site.whatsapp ? { key: 'whatsapp', href: whatsappHref(site.whatsapp) } : null,
    site.email ? { key: 'email', href: `mailto:${site.email}` } : null,
    site.calendly ? { key: 'calendly', href: site.calendly } : null,
  ].filter((item): item is { key: string; href: string } => item !== null);

  return <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__intro">
        <Brand footer />
        <p>{t('signature')}</p>
      </div>
      <div className="site-footer__columns">
        {columns.map(([column, links]) => <section className="site-footer__column" key={column}>
          <h2>{t(column)}</h2>
          <ul>{links.map((item) => <li key={item.href}><Link href={item.href}>{t(item.key)}</Link></li>)}</ul>
        </section>)}
      </div>
      <div className="site-footer__bottom">
        <div className="site-footer__trust">
          <Link className="site-footer__security" href="/securite">{t('security')}<ArrowUpRight size={15} aria-hidden="true" /></Link>
          <Link className="site-footer__manage" href="/legal/cookies">{t('manageCookies')}</Link>
        </div>
        {contacts.length > 0 && <nav className="site-footer__contacts" aria-label={t('legalInfo')}>
          {contacts.map((contact) => <a key={contact.key} href={contact.href} target="_blank" rel="noopener noreferrer">{t(contact.key)} <span>{t('newTab')}</span></a>)}
        </nav>}
        <p className="site-footer__disclaimer">{t('bankNotice')}</p>
        <p className="site-footer__copyright">© {new Date().getFullYear()} VERQIA</p>
      </div>
    </div>
  </footer>;
}
