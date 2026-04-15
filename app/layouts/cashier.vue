<template>
  <div class="cashier-layout">
    <aside class="sidebar">
      <div class="logo">WP</div>
      <nav>
        <NuxtLink to="/cashier/pos" class="nav-item" title="POS">
          <span class="icon">🛒</span>
          <span class="label">POS</span>
        </NuxtLink>
        <NuxtLink to="/cashier/history" class="nav-item" title="History">
          <span class="icon">📜</span>
          <span class="label">History</span>
        </NuxtLink>
        <NuxtLink to="/cashier/shift" class="nav-item" title="Shift">
          <span class="icon">⏳</span>
          <span class="label">Shift</span>
        </NuxtLink>
      </nav>
      <div class="logout-btn" @click="handleLogout" title="Logout">
        <span>🚪</span>
      </div>
    </aside>
    <div class="main-wrapper">
      <header class="topbar">
        <div class="page-info">
          <h2 class="title">{{ $route.meta.title || 'WarungPOS' }}</h2>
        </div>
        <div class="user-profile">
          <div class="user-meta">
            <span class="user-name">{{ authStore.user?.name }}</span>
            <span class="user-role">Cashier</span>
          </div>
          <div class="avatar">
            {{ authStore.user?.name?.charAt(0) }}
          </div>
        </div>
      </header>
      <main class="viewport">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@features/auth/application/useAuthStore';
const authStore = useAuthStore();
const handleLogout = () => authStore.logout();
</script>

<style scoped>
.cashier-layout {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-main);
}

.sidebar {
  width: 100px;
  background-color: var(--surface-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 48px;
  text-shadow: 0 0 10px var(--primary-glow);
}

nav {
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
}

.nav-item {
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: var(--transition);
  text-decoration: none;
}

.nav-item .icon {
  font-size: 1.5rem;
  transition: var(--transition);
}

.nav-item .label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.nav-item:hover, .nav-item.router-link-active {
  color: var(--primary-color);
}

.nav-item.router-link-active .icon {
  transform: scale(1.1);
}

.logout-btn {
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-muted);
  transition: var(--transition);
}

.logout-btn:hover {
  color: #ef4444;
  transform: rotate(-10deg);
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(13, 13, 13, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-size: 0.95rem;
  font-weight: 600;
}

.user-role {
  font-size: 0.75rem;
  color: var(--primary-color);
  font-weight: 500;
}

.avatar {
  width: 40px;
  height: 40px;
  background: var(--surface-hover);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--primary-color);
}

.viewport {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  background-image: radial-gradient(at 0% 0%, var(--surface-color) 0, transparent 50%),
                    radial-gradient(at 50% 0%, rgba(252, 163, 17, 0.05) 0, transparent 50%);
}
</style>
