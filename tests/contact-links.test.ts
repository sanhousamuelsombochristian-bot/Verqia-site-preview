import { describe, expect, it } from 'vitest';
import { buildCalendlyHref, buildEmailHref, buildWhatsAppHref } from '../components/sections/contact-links';

const source = 'pricing & pilot';

describe('contact outbound links', () => {
  it('preserves source in the WhatsApp query and prefilled message', () => {
    const href = buildWhatsAppHref('+225 07 00 00 00 00', 'Hello VERQIA', source, `Source: ${source}`);
    expect(href).not.toBeNull();
    const url = new URL(href!);
    expect(url.searchParams.get('source')).toBe(source);
    expect(url.searchParams.get('text')).toContain(`Source: ${source}`);
  });

  it('puts source in the email subject and prefilled body', () => {
    const href = buildEmailHref('hello@example.ci', `VERQIA enquiry — ${source}`, 'Hello', `Source: ${source}`);
    expect(href).not.toBeNull();
    const query = new URLSearchParams(href!.split('?')[1]);
    expect(query.get('subject')).toContain(source);
    expect(query.get('body')).toContain(`Source: ${source}`);
  });

  it('retains existing Calendly parameters and adds source', () => {
    const href = buildCalendlyHref('https://calendly.com/verqia/demo?month=2026-11', source);
    expect(href).not.toBeNull();
    const url = new URL(href!);
    expect(url.searchParams.get('month')).toBe('2026-11');
    expect(url.searchParams.get('source')).toBe(source);
  });

  it('rejects malformed or insecure contact targets rather than rendering dead links', () => {
    expect(buildWhatsAppHref('not-a-number', 'Hello', null, null)).toBeNull();
    expect(buildEmailHref('not-an-email', 'Subject', 'Body', null)).toBeNull();
    expect(buildCalendlyHref('http://calendly.com/example', null)).toBeNull();
  });
});
