<template>
  <div class="layout-container owner">
    <TheSidebar role="owner" />
    
    <div class="layout-main">
      <TheHeader show-search />
      
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
    radial-gradient(at 100% 100%, rgba(252, 163, 17, 0.03) 0, transparent 40%);
}
</style>
