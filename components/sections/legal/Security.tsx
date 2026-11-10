import { useTranslations } from 'next-intl';
import { ArrowUpRight, ShieldCheck, Server, KeyRound, ClipboardList } from 'lucide-react';
import { legalReferences } from '@/config/legal';
const topics = [
  { key: 'protection', icon: ShieldCheck }, { key: 'hosting', icon: Server },
  { key: 'access', icon: KeyRound }, { key: 'traceability', icon: ClipboardList },
] as const;
export function Security() {
  const t = useTranslations('securityPage');
  return <main id="main-content" className="security-page"><section className="security-hero" aria-labelledby="security-title"><div className="home-section__inner"><p className="security-hero__eyebrow">{t('eyebrow')}</p><h1 id="security-title">{t('title')}</h1><p className="security-hero__description">{t('description')}</p><div className="security-topics">{topics.map(({ key, icon: Icon }) => <article className="security-topic" key={key}><span className="security-topic__icon"><Icon aria-hidden="true" size={20} /></span><h2>{t(`topics.${key}.title`)}</h2><p>{t(`topics.${key}.description`)}</p></article>)}</div><section className="security-references" aria-labelledby="security-references-title"><h2 id="security-references-title">{t('referencesTitle')}</h2><p>{t('referenceNote')}</p><ul>{legalReferences.map(({ key, href }) => <li key={key}><h3>{t(`legalReferences.${key}.title`)}</h3><p>{t(`legalReferences.${key}.description`)}</p><a href={href} target="_blank" rel="noopener noreferrer">{t('officialText')} <ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul></section><p className="security-disclaimer">{t('disclaimer')}</p><p className="security-bank-note">{t('bankNotice')}</p></div></section></main>;
}
