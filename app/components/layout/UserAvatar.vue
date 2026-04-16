<template>
  <div class="user-avatar" :class="[size, variant]">
    {{ initials }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'gradient';
}>();

const initials = computed(() => {
  if (!props.name) return '?';
  return props.name.charAt(0).toUpperCase();
});
</script>

<style scoped>
.user-avatar {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 1px solid var(--border-color);
  user-select: none;
}

.user-avatar.sm { width: 32px; height: 32px; font-size: 0.8rem; }
.user-avatar.md { width: 40px; height: 40px; font-size: 1rem; }
.user-avatar.lg { width: 56px; height: 56px; font-size: 1.4rem; }

.user-avatar.solid {
  background-color: var(--surface-hover);
  color: var(--primary-color);
}

.user-avatar.gradient {
  background: linear-gradient(135deg, var(--primary-color) 0%, #d48806 100%);
  color: var(--bg-color);
  border: none;
}
</style>
