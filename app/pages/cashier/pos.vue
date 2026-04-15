<template>
  <div class="pos-page">
    <div class="pos-main">
      <div class="browser-container">
        <header class="browser-header">
          <div class="category-scroll">
            <button
              :class="['cat-tab', { active: activeCategoryId === null }]"
              @click="activeCategoryId = null"
            >
              All Items
            </button>
            <button
              v-for="cat in categories"
              :key="cat.id"
              :class="['cat-tab', { active: activeCategoryId === cat.id }]"
              @click="activeCategoryId = cat.id"
            >
              {{ cat.name }}
            </button>
          </div>
          <div class="search-box">
            <div class="search-inner">
              <span class="search-icon">🔍</span>
              <input v-model="searchQuery" type="text" placeholder="Search products..." />
            </div>
          </div>
        </header>

        <div class="product-grid">
          <ProductCard
            v-for="prod in filteredProducts"
            :key="prod.id"
            :product="prod"
            @add="cartStore.addItem(prod)"
          />
        </div>
      </div>
    </div>
    
    <div class="pos-sidebar">
      <PosCart @checkout="onCheckoutClick" />
    </div>

    <!-- Simple Checkout Modal -->
    <div v-if="showCheckoutModal" class="modal-overlay" @click.self="showCheckoutModal = false">
      <div class="checkout-modal">
        <BaseCard title="Payment Confirmation">
          <div class="checkout-summary">
            <div class="summary-total">
              <span class="label">Payable Amount</span>
              <span class="value">Rp {{ cartStore.subtotal.toLocaleString() }}</span>
            </div>
          </div>
          
          <div class="payment-options">
            <button class="pay-btn cash" @click="handlePayment('cash')">
              <span class="icon">💵</span>
              <span class="text">Cash Payment</span>
            </button>
            <button class="pay-btn digital" @click="handlePayment('midtrans')">
              <span class="icon">📱</span>
              <span class="text">Midtrans QRIS / E-Wallet</span>
            </button>
          </div>

          <template #footer>
            <BaseButton variant="ghost" style="width: 100%" @click="showCheckoutModal = false">
              Back to Order
            </BaseButton>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { mockCategories, mockProducts } from '@features/pos/infrastructure/mockData';
import ProductCard from '@features/pos/presentation/components/ProductCard.vue';
import PosCart from '@features/pos/presentation/components/PosCart.vue';
import { useCartStore } from '@features/pos/application/useCartStore';
import BaseCard from '@shared/components/BaseCard.vue';
import BaseButton from '@shared/components/BaseButton.vue';

definePageMeta({
  layout: 'cashier',
  title: 'Service Point'
});

const cartStore = useCartStore();

const categories = ref(mockCategories);
const products = ref(mockProducts);

const activeCategoryId = ref<string | null>(null);
const searchQuery = ref('');

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesCategory = activeCategoryId.value ? p.categoryId === activeCategoryId.value : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const showCheckoutModal = ref(false);

const onCheckoutClick = () => {
  showCheckoutModal.value = true;
};

const handlePayment = async (method: string) => {
  // Mock payment process
  alert(`Processing ${method} payment for Rp ${cartStore.subtotal.toLocaleString()}...`);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  alert('Payment Successful!');
  cartStore.clearCart();
  showCheckoutModal.value = false;
};
</script>

<style scoped>
.pos-page {
  display: grid;
  grid-template-columns: 1fr 380px;
  height: calc(100vh - 80px); /* 80px is topbar height */
  margin: -40px; /* Counteract viewport padding */
}

.pos-main {
  background-color: var(--bg-color);
  overflow-y: auto;
  padding: 40px;
}

.browser-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.browser-header {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.category-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.category-scroll::-webkit-scrollbar {
  height: 4px;
}

.cat-tab {
  padding: 10px 24px;
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  color: var(--text-muted);
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: var(--transition);
}

.cat-tab:hover {
  border-color: var(--text-muted);
}

.cat-tab.active {
  background-color: var(--primary-color);
  color: var(--bg-color);
  border-color: var(--primary-color);
  box-shadow: 0 4px 15px var(--primary-glow);
}

.search-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  padding: 12px 20px;
  border-radius: var(--radius-md);
  width: 100%;
  max-width: 400px;
}

.search-inner input {
  background: transparent;
  border: none;
  color: var(--text-main);
  outline: none;
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

.pos-sidebar {
  height: 100%;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.checkout-modal {
  width: 100%;
  max-width: 500px;
}

.checkout-summary {
  background: var(--bg-color);
  padding: 24px;
  border-radius: var(--radius-md);
  margin-bottom: 24px;
  text-align: center;
}

.summary-total .label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.summary-total .value {
  font-size: 2rem;
  font-weight: 900;
  color: var(--primary-color);
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pay-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: var(--surface-hover);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: white;
  cursor: pointer;
  transition: var(--transition);
}

.pay-btn:hover {
  border-color: var(--primary-color);
  transform: translateX(4px);
}

.pay-btn .icon {
  font-size: 1.5rem;
}

.pay-btn .text {
  font-weight: 600;
}

.pay-btn.digital {
  background: linear-gradient(135deg, #1a1a1a 0%, #262626 100%);
}
</style>
