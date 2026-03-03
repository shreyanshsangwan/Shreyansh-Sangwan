import { Category } from '../data/mockData';

export const calculatePrice = (
  distance: number,
  weight: number,
  category: Category
): number => {
  // Base logic: Base Price + (Weight * Multiplier) + (Distance * Rate per km)
  const distanceRate = 10; // $10 per km
  const price = category.basePrice + (weight * category.weightMultiplier) + (distance * distanceRate);
  return Math.round(price);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
