import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@shared/types/index';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role);

  const login = async (role: 'owner' | 'cashier') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    token.value = `mock-jwt-token-${role}`;
    user.value = {
      id: role === 'owner' ? 'owner-uuid-1' : 'cashier-uuid-1',
      name: role === 'owner' ? 'Sulthan (Owner)' : 'Budi (Cashier)',
      email: `${role}@warungpos.com`,
      role: role,
      isActive: true
    };

    // Store in localStorage for persistence (mocking persistence requested in open questions)
    localStorage.setItem('auth_token', token.value);
    localStorage.setItem('auth_user', JSON.stringify(user.value));
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    navigateTo('/login');
  };

  const initAuth = () => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    userRole,
    login,
    logout,
    initAuth
  };
});
