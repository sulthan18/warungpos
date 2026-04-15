<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '@features/auth/application/useAuthStore';
import { useShiftStore } from '@features/shift/application/useShiftStore';

// Initialize auth & shift on boot
const authStore = useAuthStore();
const shiftStore = useShiftStore();

onMounted(() => {
  authStore.initAuth();
  shiftStore.initShift();
});
</script>
