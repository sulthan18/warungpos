<template>
  <div class="layout-container cashier">
    <TheSidebar role="cashier" />
    
    <div class="layout-main">
      <TheHeader />
      
      <main class="layout-viewport scrollbar">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheSidebar from '../components/layout/TheSidebar.vue';
import TheHeader from '../components/layout/TheHeader.vue';
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-main);
  overflow: hidden;
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.layout-viewport {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  background-image: 
    radial-gradient(at 0% 0%, var(--surface-color) 0, transparent 50%),
    radial-gradient(at 50% 0%, rgba(252, 163, 17, 0.05) 0, transparent 50%);
}
</style>
