<template>
  <aside class="sidebar" :class="role">
    <div class="logo-area">
      <div class="logo-box">WP</div>
      <span v-if="role === 'owner'" class="version">v1.2</span>
    </div>

    <nav class="nav-container">
      <template v-for="(item, index) in navItems" :key="item.path">
        <div v-if="item.group && (index === 0 || navItems[index - 1].group !== item.group)" class="nav-label">
          {{ item.group }}
        </div>
        
        <NuxtLink :to="item.path" class="nav-link" :title="item.label">
          <span class="icon">{{ item.icon }}</span>
          <span class="text" v-if="role === 'owner'">{{ item.label }}</span>
          <span class="mini-label" v-else>{{ item.label }}</span>
        </NuxtLink>
      </template>
    </nav>

    <div class="sidebar-footer">
      <button class="logout-btn" @click="onLogout" :title="role === 'cashier' ? 'Logout' : ''">
        <span class="icon">🚪</span>
        <span class="text" v-if="role === 'owner'">Sign Out</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { navigation } from '@shared/config/nav';
import { useAuthStore } from '@features/auth/application/useAuthStore';

const props = defineProps<{
  role: 'owner' | 'cashier';
}>();

const authStore = useAuthStore();
const navItems = computed(() => navigation[props.role]);
const onLogout = () => authStore.logout();
</script>

<style scoped>
.sidebar {
  background-color: var(--surface-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 32px 20px;
  transition: var(--transition);
  height: 100vh;
}

/* Owner Sidebar (Full) */
.sidebar.owner {
  width: var(--sidebar-width-owner);
}

/* Cashier Sidebar (Mini/Thin) */
.sidebar.cashier {
  width: var(--sidebar-width-cashier);
  align-items: center;
  padding: 32px 0;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
  padding: 0 12px;
}

.cashier .logo-area {
  padding: 0;
  justify-content: center;
}

.logo-box {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  border-radius: 10px;
  box-shadow: 0 0 15px var(--primary-glow);
}

.version {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-weight: 600;
}

.nav-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.cashier .nav-container {
  gap: 32px;
  align-items: center;
}

.nav-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #444;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 8px;
  padding: 0 12px;
  letter-spacing: 0.05em;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  color: var(--text-muted);
  border-radius: var(--radius-md);
  transition: var(--transition);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
}

.cashier .nav-link {
  flex-direction: column;
  gap: 8px;
  padding: 0;
}

.nav-link:hover {
  background-color: var(--surface-hover);
  color: var(--text-main);
}

.nav-link.router-link-active {
  background-color: rgba(252, 163, 17, 0.1);
  color: var(--primary-color);
}

.cashier .nav-link.router-link-active {
  background-color: transparent;
}

.nav-link .icon {
  font-size: 1.25rem;
}

.cashier .nav-link .icon {
  font-size: 1.5rem;
}

.mini-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.sidebar-footer {
  margin-top: auto;
  width: 100%;
}

.owner .sidebar-footer {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: transparent;
  color: #ef4444;
  border-radius: var(--radius-md);
  transition: var(--transition);
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.cashier .logout-btn {
  justify-content: center;
  padding: 0;
  font-size: 1.5rem;
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.cashier .logout-btn:hover {
  background-color: transparent;
  transform: rotate(-10deg);
}
</style>
