import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link as LocaleLink } from '@/i18n/navigation';

type Props = { children: ReactNode; href?: string; variant?: 'primary' | 'secondary'; className?: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;
export function Button({ children, href, variant = 'primary', className = '', ...props }: Props) {
  const classes = `button button--${variant} ${className}`;
  const content = <>{children}<span className="button__icon" aria-hidden="true"><ArrowRight size={17} /></span></>;
  if (href?.startsWith('/')) return <LocaleLink className={classes} href={href} {...props as AnchorHTMLAttributes<HTMLAnchorElement>}>{content}</LocaleLink>;
  return href ? <a className={classes} href={href} {...props as AnchorHTMLAttributes<HTMLAnchorElement>}>{content}</a>
    : <button className={classes} {...props as ButtonHTMLAttributes<HTMLButtonElement>}>{content}</button>;
}
