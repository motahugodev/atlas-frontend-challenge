<script setup lang="ts">
import { ref } from 'vue'
import type { Professional } from '~/types/index'
import { formatCurrency } from '~/utils/currency'

defineProps<{
  professional: Professional
}>()

const isOpen = ref(false)

function handleContratar(): void {
  isOpen.value = true
}
</script>

<template>
  <aside
    aria-label="Contratar profissional"
    class="max-w-xs"
  >
    <UPricingPlan
      title="Contrate aqui"
      description="Aproveite agora a melhor oferta"
      :price="formatCurrency(professional.serviceValue)"
      :features="professional.providedServices"
      :button="{ label: 'Contratar', onClick: handleContratar }"
      variant="subtle"
    />

    <UModal v-model:open="isOpen">
      <template #content>
        <div class="flex flex-col items-center gap-4 p-8 text-center">
          <UIcon
            name="i-heroicons-check"
            class="text-green-500 size-16"
          />
          <div class="space-y-1">
            <p class="text-lg font-semibold">
              Contratado com sucesso!
            </p>
            <p class="text-sm text-muted">
              Em breve o profissional entrará em contato.
            </p>
          </div>
          <UButton
            label="Fechar"
            @click="isOpen = false"
          />
        </div>
      </template>
    </UModal>
  </aside>
</template>
