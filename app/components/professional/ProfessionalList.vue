<template>
  <UContainer>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <template v-if="status === 'pending' || status === 'idle'">
        <ProfessionalCardSkeleton
          v-for="index in 8"
          :key="`skeleton-professional-${index}`"
        />
      </template>
      <template v-else-if="status === 'success' && professionals.length > 0">
        <ProfessionalCard
          v-for="(professional, index) in professionals"
          :key="`card-professional-${index}`"
          :professional="professional"
        />
      </template>
    </div>
    <div v-if="status === 'error' || professionals.length === 0">
      <div class="flex justify-center items-center w-full">
        <UEmpty
          icon="i-lucide-file"
          title="Item não encontrado"
          description="Ocorreu um erro ao carregar os profissionais. Por favor, tente novamente mais tarde."
        />
      </div>
    </div>
    <div class="flex justify-center my-8">
      <slot name="footer" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { ProfessionalCard } from '~/types/index'

defineProps<{
  professionals: ProfessionalCard[]
  status: string
}>()
</script>
