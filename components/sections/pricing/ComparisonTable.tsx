'use client';
import { LockKeyhole } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { comparisonFeatures, type PlanKey } from '@/config/plans';
const planKeys: readonly PlanKey[] = ['free', 'starter', 'business', 'enterprise'];
export function ComparisonTable() {
  const t = useTranslations('pricingPage.comparison');
  return <div className="pricing-table-wrap"><table className="pricing-table">
    <caption>{t('caption')}</caption>
    <thead><tr><th scope="col">{t('feature')}</th>{planKeys.map((key) => <th scope="col" key={key} className={key === 'business' ? 'pricing-table__featured' : ''}>{t(`plans.${key}`)}</th>)}</tr></thead>
    <tbody>{comparisonFeatures.map(({ key, values }) => <tr key={key}>
      <th scope="row">{t(`features.${key}`)}</th>
      {planKeys.map((plan) => {
        const value = values[plan];
        if (value === 'no') {
          const requiredPlan = planKeys.slice(planKeys.indexOf(plan) + 1).find((candidate) => values[candidate] !== 'no') ?? 'enterprise';
          return <td key={plan} className="pricing-table__locked"><span><LockKeyhole size={14} aria-hidden="true" />{t('notIncluded')}<small>{t('fromPlan', { plan: t(`plans.${requiredPlan}`) })}</small></span></td>;
        }
        return <td key={plan} className={plan === 'business' ? 'pricing-table__featured' : ''}>{t(`values.${value}`)}</td>;
      })}
    </tr>)}</tbody>
  </table></div>;
}
