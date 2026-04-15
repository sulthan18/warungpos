<template>
  <div class="shift-page">
    <div v-if="!shiftStore.isShiftOpen" class="centered-view">
      <div class="setup-illustration">⏳</div>
      <BaseCard title="Initialize Shift" class="shift-card">
        <p class="instr">Input the initial cash amount in the drawer to activate the POS system.</p>
        
        <div class="input-form">
          <BaseInput
            v-model.number="openingCash"
            label="Opening Balance"
            type="number"
            placeholder="e.g. 500000"
          />
        </div>

        <template #footer>
          <BaseButton
            variant="primary"
            style="width: 100%"
            :disabled="openingCash < 0"
            :loading="loading"
            @click="handleOpen"
          >
            Open Shift
          </BaseButton>
        </template>
      </BaseCard>
    </div>

    <div v-else class="shift-dashboard">
      <header class="shift-header">
        <h1>Active Shift Dashboard</h1>
        <div class="status-indicator">
          <span class="pulse"></span>
          LIVE
        </div>
      </header>

      <div class="metrics-row">
        <BaseCard title="Shift Metadata">
          <div class="meta-item">
            <span class="label">Shift ID</span>
            <span class="val">{{ shiftStore.currentShift?.id }}</span>
          </div>
          <div class="meta-item">
            <span class="label">Started At</span>
            <span class="val">{{ new Date(shiftStore.currentShift?.startTime || '').toLocaleString() }}</span>
          </div>
        </BaseCard>

        <BaseCard title="Financial Snapshot">
          <div class="meta-item">
            <span class="label">Opening Cash</span>
            <span class="val highlight">Rp {{ shiftStore.currentShift?.openingCash.toLocaleString() }}</span>
          </div>
          <div class="meta-item">
            <span class="label">Current Sales (Estimated)</span>
            <span class="val">Rp 0</span>
          </div>
        </BaseCard>
      </div>

      <div class="danger-zone">
        <BaseCard title="Finalize Operation" class="danger-card">
          <p>Closing the shift will generate a summary report and lock current transactions.</p>
          <div class="close-form">
            <BaseInput
              v-model.number="closingCash"
              label="Actual Cash in Drawer"
              type="number"
              placeholder="e.g. 2500000"
            />
          </div>
          <template #footer>
            <BaseButton
              variant="danger"
              style="width: 100%"
              :loading="loading"
              @click="handleClose"
            >
              Close Shift & Generate Report
            </BaseButton>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useShiftStore } from '@features/shift/application/useShiftStore';
import BaseCard from '@shared/components/BaseCard.vue';
import BaseInput from '@shared/components/BaseInput.vue';
import BaseButton from '@shared/components/BaseButton.vue';

definePageMeta({
  layout: 'cashier',
  title: 'Shift Management'
});

const shiftStore = useShiftStore();
const openingCash = ref(0);
const closingCash = ref(0);
const loading = ref(false);

const handleOpen = async () => {
  loading.value = true;
  await shiftStore.openShift(openingCash.value);
  loading.value = false;
  navigateTo('/cashier/pos');
};

const handleClose = async () => {
  if (confirm('Are you sure you want to end this shift?')) {
    loading.value = true;
    await shiftStore.closeShift(closingCash.value);
    loading.value = false;
  }
};
</script>

<style scoped>
.shift-page {
  max-width: 1000px;
  margin: 0 auto;
}

.centered-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-top: 60px;
}

.setup-illustration {
  font-size: 4rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.shift-card {
  width: 100%;
  max-width: 480px;
}

.instr {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.input-form {
  margin-top: 24px;
}

.shift-dashboard {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.shift-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 6px 12px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.8rem;
}

.pulse {
  width: 8px;
  height: 8px;
  background-color: currentColor;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

.metrics-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.meta-item:last-child {
  border-bottom: none;
}

.meta-item .label {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.meta-item .val {
  font-weight: 600;
}

.highlight {
  color: var(--primary-color);
}

.danger-zone {
  margin-top: 40px;
}

.danger-card {
  border-color: rgba(239, 68, 68, 0.3);
}

.close-form {
  margin-top: 24px;
}
</style>
