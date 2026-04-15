import { useAuthStore } from '@features/auth/application/useAuthStore';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // 1. Skip middleware during SSR if needed or handle hydration
  // For mock/MVP, we'll focus on client-side routing
  
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  // 2. Redirect to login if not authenticated
  if (authRequired && !authStore.isAuthenticated) {
    return navigateTo('/login');
  }

  // 3. Redirect authenticated users away from login page
  if (to.path === '/login' && authStore.isAuthenticated) {
    if (authStore.userRole === 'owner') return navigateTo('/owner/dashboard');
    return navigateTo('/cashier/pos');
  }

  // 4. Role-based Guarding
  if (to.path.startsWith('/owner') && authStore.userRole !== 'owner') {
    return navigateTo('/cashier/pos');
  }

  if (to.path.startsWith('/cashier') && authStore.userRole !== 'cashier') {
    return navigateTo('/owner/dashboard');
  }
});
