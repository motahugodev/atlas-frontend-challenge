<script setup lang="ts">
import type { Professional } from '~/types/index'
import { formatCurrency } from '~/utils/currency'

defineProps<{
  professional: Professional
}>()
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
      :button="{ label: 'Contratar' }"
      variant="subtle"
    />
  </aside>
</template>
