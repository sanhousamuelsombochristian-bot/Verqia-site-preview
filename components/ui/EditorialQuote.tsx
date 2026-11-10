import { useTranslations } from 'next-intl';
export type QuoteId = 1 | 2 | 3 | 4 | 5;
export function EditorialQuote({ text, id }: { text?: string; id: QuoteId }) {
  const t = useTranslations('quotes');
  return <figure className="editorial-quote"><blockquote>{text ?? t(String(id))}</blockquote></figure>;
}
