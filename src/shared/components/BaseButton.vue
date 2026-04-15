<template>
  <button
    :class="['base-button', variant]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot v-if="!loading" />
    <span v-else class="loader"></span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
}>();
defineEmits(['click']);
</script>

<style scoped>
.base-button {
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  white-space: nowrap;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background-color: var(--primary-color);
  color: var(--bg-color);
}

.primary:hover:not(:disabled) {
  filter: brightness(1.1);
  box-shadow: 0 0 20px var(--primary-glow);
}

.secondary {
  background-color: var(--surface-color);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.secondary:hover:not(:disabled) {
  background-color: var(--surface-hover);
}

.ghost {
  background-color: transparent;
  color: var(--text-muted);
}

.ghost:hover:not(:disabled) {
  color: var(--text-main);
  background-color: var(--surface-hover);
}

.danger {
  background-color: #ef4444;
  color: white;
}

.danger:hover:not(:disabled) {
  filter: brightness(1.1);
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
