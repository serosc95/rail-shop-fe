export function formatCurrency(
  value: number | string,
  currency: string = 'CLP',
  locale: string = 'es-CL'
): string {
  const numeric = Number(value);

  return numeric.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
