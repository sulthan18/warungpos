export type UserRole = 'owner' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
}

export interface Promo {
  id: string;
  name: string;
  type: 'percentage' | 'nominal';
  value: number;
  maxUsage: number;
  startDate: string;
  endDate: string;
}

export interface Shift {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  openingCash: number;
  closingCash?: number;
}

export type OrderStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type PaymentMethod = 'cash' | 'midtrans';

export interface Order {
  id: string;
  userId: string;
  shiftId: string;
  tableId?: string;
  totalBeforeDiscount: number;
  discountAmount: number;
  grandTotal: number;
  status: OrderStatus;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  qty: number;
  priceAtTime: number;
  subtotal: number;
}
