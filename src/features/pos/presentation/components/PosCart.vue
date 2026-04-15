<template>
  <div class="pos-cart">
    <div class="cart-header">
      <div class="heading">
        <h2>Order Summary</h2>
        <span class="item-count">{{ cartStore.itemCount }} items</span>
      </div>
      <button class="clear-btn" @click="cartStore.clearCart" v-if="cartStore.items.length > 0">
        Clear All
      </button>
    </div>

    <div class="cart-body">
      <div v-if="cartStore.items.length === 0" class="empty-state">
        <div class="empty-icon">🛒</div>
        <p>No items in cart</p>
        <span class="sub-text">Add products to start an order</span>
      </div>
      
      <div v-else class="items-list">
        <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
          <div class="item-details">
            <span class="item-name">{{ item.product.name }}</span>
            <span class="item-price">Rp {{ item.product.price.toLocaleString() }}</span>
          </div>
          <div class="qty-actions">
            <button class="qty-btn" @click="cartStore.updateQty(item.product.id, -1)">−</button>
            <span class="qty-value">{{ item.qty }}</span>
            <button class="qty-btn" @click="cartStore.updateQty(item.product.id, 1)">+</button>
          </div>
          <div class="item-total">
            Rp {{ (item.product.price * item.qty).toLocaleString() }}
          </div>
        </div>
      </div>
    </div>

    <div class="cart-footer">
      <div class="price-summary">
        <div class="summary-line">
          <span class="label">Subtotal</span>
          <span class="val">Rp {{ cartStore.subtotal.toLocaleString() }}</span>
        </div>
        <div class="summary-line">
          <span class="label">Service Tax (0%)</span>
          <span class="val">Rp 0</span>
        </div>
        <div class="summary-line grand-total">
          <span class="label">Total Amount</span>
          <span class="val">Rp {{ cartStore.subtotal.toLocaleString() }}</span>
        </div>
      </div>
      
      <BaseButton
        variant="primary"
        class="checkout-btn"
        :disabled="cartStore.items.length === 0"
        @click="$emit('checkout')"
      >
        Place Order
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../application/useCartStore';
import BaseButton from '@shared/components/BaseButton.vue';

const cartStore = useCartStore();

defineEmits(['checkout']);
</script>

<style scoped>
.pos-cart {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--surface-color);
  border-left: 1px solid var(--border-color);
}

.cart-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.heading h2 {
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.item-count {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.clear-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
}

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  gap: 12px;
}

.empty-icon {
  font-size: 3rem;
  opacity: 0.2;
}

.sub-text {
  font-size: 0.8rem;
}

.items-list {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr 100px 80px;
  align-items: center;
  gap: 12px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 600;
}

.item-price {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.qty-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-color);
  border-radius: 20px;
  padding: 4px;
  border: 1px solid var(--border-color);
}

.qty-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: var(--surface-hover);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
}

.qty-value {
  font-size: 0.9rem;
  font-weight: 700;
}

.item-total {
  font-size: 0.9rem;
  font-weight: 700;
  text-align: right;
  color: var(--primary-color);
}

.cart-footer {
  padding: 24px;
  background-color: var(--surface-hover);
  border-top: 1px solid var(--border-color);
}

.price-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.grand-total {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px dashed var(--border-color);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-main);
}

.grand-total .val {
  color: var(--primary-color);
}

.checkout-btn {
  width: 100%;
  height: 56px;
  font-size: 1.1rem;
}
</style>
