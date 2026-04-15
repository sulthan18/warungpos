<template>
  <div class="login-page">
    <div class="header">
      <div class="logo-placeholder">☕</div>
      <h1>Welcome Back</h1>
      <p>Sign in to manage your coffee shop</p>
    </div>

    <form @submit.prevent="handleLogin" class="login-form">
      <BaseInput
        v-model="form.email"
        label="Email Address"
        type="email"
        placeholder="name@example.com"
        :error-message="error"
        required
      />
      
      <BaseInput
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="••••••••"
        required
      />

      <div class="options">
        <label class="remember">
          <input type="checkbox" v-model="form.remember" />
          <span>Remember me</span>
        </label>
        <a href="#" class="forgot">Forgot password?</a>
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        :loading="loading"
        style="width: 100%"
      >
        Sign In
      </BaseButton>
    </form>
    
    <div class="footer">
      <p>Don't have an account? <a href="#">Contact Owner</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from '@features/auth/application/useAuthStore';
import BaseInput from '@shared/components/BaseInput.vue';
import BaseButton from '@shared/components/BaseButton.vue';

definePageMeta({
  layout: 'auth'
});

const form = reactive({
  email: '',
  password: '',
  remember: false
});

const authStore = useAuthStore();
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  if (loading.value) return;
  
  loading.value = true;
  error.value = '';

  try {
    const role = form.email.includes('owner') ? 'owner' : 'cashier';
    await authStore.login(role);
    
    // REDIRECTION handled by middleware or explicit
    const target = role === 'owner' ? '/owner/dashboard' : '/cashier/pos';
    await navigateTo(target);
  } catch (e) {
    error.value = 'Failed to sign in. Please try again.';
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.header {
  text-align: center;
}

.logo-placeholder {
  font-size: 3rem;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 10px var(--primary-glow));
}

.header h1 {
  font-size: 1.75rem;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-muted);
}

.forgot {
  color: var(--primary-color);
  font-weight: 500;
  transition: var(--transition);
}

.forgot:hover {
  filter: brightness(1.2);
  text-decoration: underline;
}

.footer {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer a {
  color: var(--primary-color);
  font-weight: 500;
}
</style>
