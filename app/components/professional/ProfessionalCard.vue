<script setup lang="ts">
import type { ProfessionalCard } from '~/types/index'

defineProps<{
  professional: ProfessionalCard
}>()

// Formatador nativo e performático para a moeda local
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

<template>
  <UCard class="max-w-sm w-full transition-shadow hover:shadow-md">
    <template #header>
      <UUser
        :name="professional.name"
        :alt="`Nome do profissional: ${professional.name}`"
        :description="professional.profession"
        :avatar="{
          src: professional.avatar,
          width: '96',
          height: '96',
          loading: 'lazy',
          decoding: 'async'
        }"
      />
    </template>

    <!-- Bloco de Conteúdo Textual -->
    <div class="mt-4 w-full">
      <div
        class="flex flex-col items-center justify-center"
        :aria-label="`Valor do serviço prestado: ${formatCurrency(professional.serviceValue)}`"
      >
        <span class="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">
          Valor do Serviço
        </span>
        <span
          class="mt-1 text-2xl font-bold text-gray-900 dark:text-white"
          aria-hidden="true"
        >
          {{ formatCurrency(professional.serviceValue) }}
        </span>
      </div>
    </div>

    <template #footer>
      <UButton
        block
        color="primary"
        variant="solid"
        :aria-label="`Contratar serviço de ${professional.name}`"
      >
        Contratar
      </UButton>
    </template>
  </UCard>
</template>
