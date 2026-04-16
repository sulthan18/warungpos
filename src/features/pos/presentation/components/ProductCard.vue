<template>
  <div class="product-card" @click="$emit('add')">
    <div class="product-image">
      <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" />
      <div v-else class="image-placeholder">☕</div>
      <div class="price-tag">Rp {{ product.price.toLocaleString() }}</div>
    </div>
    <div class="product-info">
      <h3 class="name">{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>
    </div>
    <div class="add-btn">+</div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@shared/types';

defineProps<{
  product: Product;
}>();

defineEmits(['add']);
</script>

<style scoped>
.product-card {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.product-image {
  height: 160px;
  background-color: var(--surface-hover);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.image-placeholder {
  font-size: 3rem;
}

.price-tag {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--primary-color);
  color: var(--bg-color);
  padding: 4px 12px;
  font-size: 0.85rem;
  font-weight: 700;
  border-top-left-radius: var(--radius-md);
}

.product-info {
  padding: 16px;
  flex: 1;
}

.name {
  font-size: 1rem;
  margin-bottom: 4px;
}

.description {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}

.add-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  opacity: 0;
  transform: scale(0.8);
  transition: var(--transition);
}

.product-card:hover .add-btn {
  opacity: 1;
  transform: scale(1);
}
</style>
