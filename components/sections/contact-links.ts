import { z } from 'zod';

const emailSchema = z.string().trim().email();
const urlSchema = z.string().trim().url();

function appendSource(text: string, sourceLine: string | null): string {
  return sourceLine ? `${text}\n${sourceLine}` : text;
}

export function buildWhatsAppHref(value: string, message: string, source: string | null, sourceLine: string | null): string | null {
  const trimmed = value.trim();
  const text = appendSource(message, sourceLine);
  if (/^https:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const host = url.hostname.toLowerCase();
      if (!['wa.me', 'api.whatsapp.com'].includes(host)) return null;
      const configuredPhone = host === 'wa.me' ? url.pathname.replace(/\D/g, '') : (url.searchParams.get('phone') ?? '').replace(/\D/g, '');
      if (configuredPhone.length < 8 || configuredPhone.length > 15) return null;
      url.searchParams.set('text', text);
      if (source) url.searchParams.set('source', source);
      return url.toString();
    } catch {
      return null;
    }
  }
  if (/^https?:\/\//i.test(trimmed)) return null;
  const phone = trimmed.replace(/\D/g, '');
  if (phone.length < 8 || phone.length > 15) return null;
  const url = new URL(`https://wa.me/${phone}`);
  url.searchParams.set('text', text);
  if (source) url.searchParams.set('source', source);
  return url.toString();
}

export function buildEmailHref(value: string, subject: string, body: string, sourceLine: string | null): string | null {
  const email = emailSchema.safeParse(value);
  if (!email.success) return null;
  const params = new URLSearchParams({ subject, body: appendSource(body, sourceLine) });
  return `mailto:${email.data}?${params.toString()}`;
}

export function buildCalendlyHref(value: string, source: string | null): string | null {
  const candidate = urlSchema.safeParse(value);
  if (!candidate.success) return null;
  try {
    const url = new URL(candidate.data);
    if (url.protocol !== 'https:') return null;
    if (source) url.searchParams.set('source', source);
    return url.toString();
  } catch {
    return null;
  }
}
