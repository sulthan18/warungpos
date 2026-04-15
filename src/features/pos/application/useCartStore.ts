import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, OrderItem } from '@shared/types';

export interface CartItem {
  product: Product;
  qty: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  
  const subtotal = computed(() => {
    return items.value.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  });

  const itemCount = computed(() => {
    return items.value.reduce((acc, item) => acc + item.qty, 0);
  });

  const addItem = (product: Product) => {
    const existing = items.value.find(i => i.product.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      items.value.push({ product, qty: 1 });
    }
  };

  const removeItem = (productId: string) => {
    const index = items.value.findIndex(i => i.product.id === productId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  const updateQty = (productId: string, delta: number) => {
    const item = items.value.find(i => i.product.id === productId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        removeItem(productId);
      }
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    subtotal,
    itemCount,
    addItem,
    removeItem,
    updateQty,
    clearCart
  };
});
