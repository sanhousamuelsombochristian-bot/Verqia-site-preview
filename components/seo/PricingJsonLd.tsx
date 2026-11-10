import { plans } from '@/config/plans';
import { publicCommercialOfferEnabled } from '@/lib/launch-scope';
import { JsonLd } from './JsonLd';
export function PricingJsonLd({ freeName, starterName, monthlyLabel }: { freeName: string; starterName: string; monthlyLabel: string }) {
  if (!publicCommercialOfferEnabled) return null;
  const offers: Record<string, unknown>[] = [];
  if (plans.free.monthly.status === 'confirmed') offers.push({ '@context': 'https://schema.org', '@type': 'Offer', name: freeName, price: plans.free.monthly.value, priceCurrency: 'XOF' });
  if (plans.starter.monthly.status === 'confirmed') offers.push({ '@context': 'https://schema.org', '@type': 'Offer', name: `${starterName} — ${monthlyLabel}`, price: plans.starter.monthly.value, priceCurrency: 'XOF' });
  return <>{offers.map((offer, index) => <JsonLd key={index} data={offer} />)}</>;
}
