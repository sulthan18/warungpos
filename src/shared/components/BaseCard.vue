<template>
  <div :class="['base-card', { clickable }]" @click="onClick">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title">{{ title }}</h3>
      </slot>
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  clickable?: boolean;
}>();

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>

<style scoped>
.base-card {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}

.base-card.clickable {
  cursor: pointer;
}

.base-card.clickable:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.card-body {
  padding: 20px;
}

.card-footer {
  padding: 16px 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-top: 1px solid var(--border-color);
}
</style>
