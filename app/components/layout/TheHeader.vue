<template>
  <header class="header">
    <div class="breadcrumb">
      <h2 class="title">{{ title || $route.meta.title || 'WarungPOS' }}</h2>
    </div>

    <div class="search-wrap" v-if="showSearch">
      <span class="icon">🔍</span>
      <input type="text" placeholder="Search menu, orders, or reports..." aria-label="Search" />
    </div>

    <div class="header-actions">
      <div class="notif-btn" title="Notifications">
        <span class="icon">🔔</span>
        <span class="badge"></span>
      </div>
      
      <div class="user-profile">
        <div class="user-meta">
          <span class="name">{{ authStore.user?.name }}</span>
          <span class="role">{{ roleLabel }}</span>
        </div>
        <UserAvatar :name="authStore.user?.name" variant="gradient" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@features/auth/application/useAuthStore';
import UserAvatar from './UserAvatar.vue';

const props = defineProps<{
  title?: string;
  showSearch?: boolean;
}>();

const authStore = useAuthStore();
const roleLabel = computed(() => {
  const r = authStore.userRole;
  return r === 'owner' ? 'Administrator' : 'Cashier';
});
</script>

<style scoped>
.header {
  height: var(--header-height);
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(13, 13, 13, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 50;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--surface-color);
  padding: 10px 16px;
  border-radius: 100px;
  width: 320px;
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.search-wrap:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 10px rgba(252, 163, 17, 0.1);
}

.search-wrap input {
  background: transparent;
  border: none;
  color: var(--text-main);
  outline: none;
  font-size: 0.9rem;
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notif-btn {
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--text-muted);
  position: relative;
  transition: var(--transition);
}

.notif-btn:hover {
  color: var(--text-main);
  transform: translateY(-2px);
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  border: 2px solid var(--bg-color);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 12px;
  border-left: 1px solid var(--border-color);
}

.user-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.name {
  font-size: 0.9rem;
  font-weight: 600;
}

.role {
  font-size: 0.75rem;
  color: var(--primary-color);
  font-weight: 500;
}
</style>
