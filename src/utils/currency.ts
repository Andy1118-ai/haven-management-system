// Currency formatting utilities for Kenyan Shillings
export const formatKES = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const parseKES = (value: string): number => {
  // Remove currency symbols and parse
  const cleaned = value.replace(/[KES\s,]/g, '');
  return parseFloat(cleaned) || 0;
};

export const formatKESCompact = (amount: number): string => {
  if (amount >= 1000000) {
    return `KES ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `KES ${(amount / 1000).toFixed(1)}K`;
  }
  return formatKES(amount);
};