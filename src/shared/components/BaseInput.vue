<template>
  <div class="base-input-container">
    <label v-if="label" :for="id" class="base-input-label">{{ label }}</label>
    <div class="input-wrapper" :class="{ focused: isFocused, error: !!errorMessage }">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
    <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id?: string;
  label?: string;
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const isFocused = ref(false);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.base-input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.base-input-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
  margin-left: 2px;
}

.input-wrapper {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 2px 4px;
  transition: var(--transition);
}

.input-wrapper:hover {
  border-color: var(--text-muted);
}

.input-wrapper.focused {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-glow);
}

.input-wrapper.error {
  border-color: #ef4444;
}

input {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text-main);
  padding: 10px 12px;
  font-size: 0.95rem;
  outline: none;
}

input::placeholder {
  color: #555;
}

input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.error-text {
  font-size: 0.8rem;
  color: #ef4444;
  margin-left: 2px;
}
</style>
