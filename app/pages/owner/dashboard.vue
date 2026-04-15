<template>
  <div class="dashboard-placeholder">
    <h1>Owner Dashboard</h1>
    <p>Welcome to the management console.</p>
    
    <div class="stats-grid">
      <BaseCard title="Today's Sales">
        <h2 style="color: var(--primary-color)">Rp 2.500.000</h2>
      </BaseCard>
      <BaseCard title="Active Orders">
        <h2>12</h2>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@shared/components/BaseCard.vue';

definePageMeta({
  layout: 'owner',
  title: 'Analytics Dashboard'
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 24px;
}
</style>
