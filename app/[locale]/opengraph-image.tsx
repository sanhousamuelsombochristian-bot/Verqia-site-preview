import { ImageResponse } from 'next/og';
export const alt = 'VERQIA — pilotage des créances et décisions financières';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
type Props = { params: Promise<{ locale: string }> };
export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const title = locale === 'fr' ? 'Voyez vos créances. Sachez quoi traiter ensuite.' : 'See your receivables. Know what to handle next.';
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#171717', color: '#f5f3ed', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, letterSpacing: 5, fontWeight: 700 }}><span style={{ width: 24, height: 24, borderRadius: 99, background: '#97f201' }} />VERQIA</div><div style={{ maxWidth: 960, fontSize: 68, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div><div style={{ display: 'flex', fontSize: 22, color: '#a3a3a3' }}>VERQIA PILOT · {locale === 'fr' ? 'Pilotage financier' : 'Financial management'}</div></div>, size);
}
