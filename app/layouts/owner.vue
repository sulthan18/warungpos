<template>
  <div class="owner-layout">
    <aside class="sidebar">
      <div class="logo-area">
        <div class="logo">WP</div>
        <span class="version">v1.0</span>
      </div>
      
      <nav class="nav-group">
        <NuxtLink to="/owner/dashboard" class="nav-link">
          <span class="icon">📊</span>
          <span class="text">Dashboard</span>
        </NuxtLink>
        
        <div class="nav-label">Management</div>
        <NuxtLink to="/owner/products" class="nav-link">
          <span class="icon">☕</span>
          <span class="text">Products</span>
        </NuxtLink>
        <NuxtLink to="/owner/stocks" class="nav-link">
          <span class="icon">📦</span>
          <span class="text">Inventory</span>
        </NuxtLink>
        <NuxtLink to="/owner/tables" class="nav-link">
          <span class="icon">🪑</span>
          <span class="text">Tables</span>
        </NuxtLink>
        
        <div class="nav-label">Admin</div>
        <NuxtLink to="/owner/users" class="nav-link">
          <span class="icon">👥</span>
          <span class="text">Staff</span>
        </NuxtLink>
        <NuxtLink to="/owner/promos" class="nav-link">
          <span class="icon">🏷️</span>
          <span class="text">Promos</span>
        </NuxtLink>
        <NuxtLink to="/owner/reports" class="nav-link">
          <span class="icon">📈</span>
          <span class="text">Reports</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <span class="icon">🚪</span>
          <span class="text">Sign Out</span>
        </button>
      </div>
    </aside>

    <div class="main-body">
      <header class="header">
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search anything..." />
        </div>
        
        <div class="actions">
          <div class="notif">🔔</div>
          <div class="profile">
            <div class="profile-info">
              <span class="name">{{ authStore.user?.name }}</span>
              <span class="role">Administrator</span>
            </div>
            <div class="avatar">
              {{ authStore.user?.name?.charAt(0) }}
            </div>
          </div>
        </div>
      </header>

      <main class="content-area">
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
.owner-layout {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color);
}

.sidebar {
  width: 260px;
  background-color: var(--surface-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 32px 20px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
  padding: 0 12px;
}

.logo {
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

.nav-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
}

.nav-link:hover {
  background-color: var(--surface-hover);
  color: var(--text-main);
}

.nav-link.router-link-active {
  background-color: rgba(252, 163, 17, 0.1);
  color: var(--primary-color);
}

.sidebar-footer {
  margin-top: auto;
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
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.main-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--surface-color);
  padding: 10px 16px;
  border-radius: 100px;
  width: 300px;
  border: 1px solid var(--border-color);
}

.search-bar input {
  background: transparent;
  border: none;
  color: var(--text-main);
  outline: none;
  font-size: 0.9rem;
  width: 100%;
}

.actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notif {
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-muted);
}

.profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-info {
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
  color: var(--text-muted);
}

.avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color) 0%, #d48806 100%);
  color: var(--bg-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  background-image: radial-gradient(at 100% 100%, rgba(252, 163, 17, 0.03) 0, transparent 40%);
}
</style>
