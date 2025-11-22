
export const CURRENCY = 'XOF';
export const CURRENCY_SYMBOL = 'CFA';

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} ${CURRENCY_SYMBOL}`;
}

export function calculateDeposit(totalPrice: number, depositPercentage: number = 30): number {
  return Math.round(totalPrice * (depositPercentage / 100));
}
