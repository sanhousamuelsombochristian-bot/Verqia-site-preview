export function calculateAnnualSavings(monthlyPrice: number, annualPrice: number): number {
  return Math.max(0, monthlyPrice * 12 - annualPrice);
}

export function calculateFreeMonths(monthlyPrice: number, annualPrice: number): number {
  if (monthlyPrice <= 0) return 0;
  return Math.floor(calculateAnnualSavings(monthlyPrice, annualPrice) / monthlyPrice);
}
