import { CartItem } from '@/types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateCartTotals = (items: CartItem[], discount: number = 0, discountType: 'percentage' | 'flat' | null = null) => {
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const itemDiscount = item.discount || 0;
    return sum + (itemTotal - (itemTotal * itemDiscount / 100));
  }, 0);

  let finalDiscount = 0;
  if (discountType === 'percentage') {
    finalDiscount = (subtotal * discount) / 100;
  } else if (discountType === 'flat') {
    finalDiscount = discount;
  }

  const tax = (subtotal - finalDiscount) * 0.08;
  const total = subtotal - finalDiscount + tax;

  return {
    subtotal,
    discount: finalDiscount,
    tax,
    total,
  };
};

export const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};