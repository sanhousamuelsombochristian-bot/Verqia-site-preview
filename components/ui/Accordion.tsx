'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
export type AccordionItem = { question: string; answer: string };
export function Accordion({ items, label = 'FAQ' }: { items: readonly AccordionItem[]; label?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="accordion" aria-label={label}>{items.map((item, index) => {
    const expanded = open === index;
    const panelId = `accordion-panel-${index}`;
    return <section className="accordion__item" key={`${item.question}-${index}`}>
      <h3><button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : index)}>
        <span>{item.question}</span><Plus aria-hidden="true" className={expanded ? 'accordion__plus is-open' : 'accordion__plus'} size={20} />
      </button></h3>
      <div id={panelId} hidden={!expanded} className="accordion__answer">{item.answer}</div>
    </section>;
  })}</div>;
}
