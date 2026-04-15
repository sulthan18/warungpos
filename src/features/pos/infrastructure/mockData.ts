import type { Product, Category } from '@shared/types';

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Coffee' },
  { id: 'cat-2', name: 'Tea' },
  { id: 'cat-3', name: 'Pastry' },
  { id: 'cat-4', name: 'Merchandise' }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    categoryId: 'cat-1',
    name: 'Espresso',
    description: 'Strong and bold single shot',
    price: 22000,
    isAvailable: true
  },
  {
    id: 'prod-2',
    categoryId: 'cat-1',
    name: 'Cafe Latte',
    description: 'Espresso with steamed milk and thin foam',
    price: 32000,
    isAvailable: true
  },
  {
    id: 'prod-3',
    categoryId: 'cat-1',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and foam',
    price: 35000,
    isAvailable: true
  },
  {
    id: 'prod-4',
    categoryId: 'cat-2',
    name: 'Matcha Latte',
    description: 'Premium Japanese matcha with milk',
    price: 38000,
    isAvailable: true
  },
  {
    id: 'prod-5',
    categoryId: 'cat-3',
    name: 'Butter Croissant',
    description: 'Flaky and buttery classic pastry',
    price: 25000,
    isAvailable: true
  },
  {
    id: 'prod-6',
    categoryId: 'cat-3',
    name: 'Pain au Chocolat',
    description: 'Croissant filled with dark chocolate',
    price: 28000,
    isAvailable: true
  }
];
