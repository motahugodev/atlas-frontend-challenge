<script setup lang="ts">
import type { Professional } from '~/types/index'

defineProps<{
  professional: Professional
}>()
</script>

<template>
  <section aria-label="Informações do profissional">
    <div class="space-y-4">
      <UPageCard
        title="Localização"
        :description="professional.location ? `${professional.location.city}, ${professional.location.state}` : 'Não informada'"
        variant="soft"
        icon="i-heroicons-map-pin"
      />
      <UPageCard
        title="Descrição"
        :description="professional.description"
        variant="soft"
        icon="i-heroicons-document-text"
      />
    </div>
  </section>
</template>
