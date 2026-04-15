import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Shift } from '@shared/types';
import { useAuthStore } from '@features/auth/application/useAuthStore';

export const useShiftStore = defineStore('shift', () => {
  const authStore = useAuthStore();
  const currentShift = ref<Shift | null>(null);

  const isShiftOpen = computed(() => !!currentShift.value && !currentShift.value.endTime);

  const openShift = async (openingCash: number) => {
    if (!authStore.user) return;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    currentShift.value = {
      id: `shift-uuid-${Date.now()}`,
      userId: authStore.user.id,
      startTime: new Date().toISOString(),
      openingCash: openingCash
    };

    localStorage.setItem('current_shift', JSON.stringify(currentShift.value));
  };

  const closeShift = async (closingCash: number) => {
    if (!currentShift.value) return;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    currentShift.value.endTime = new Date().toISOString();
    currentShift.value.closingCash = closingCash;

    // In a real app, we'd send this to the backend
    localStorage.removeItem('current_shift');
    currentShift.value = null;
    
    navigateTo('/cashier/shift');
  };

  const initShift = () => {
    const saved = localStorage.getItem('current_shift');
    if (saved) {
      currentShift.value = JSON.parse(saved);
    }
  };

  return {
    currentShift,
    isShiftOpen,
    openShift,
    closeShift,
    initShift
  };
});
