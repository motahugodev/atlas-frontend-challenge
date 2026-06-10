<script setup lang="ts">
import type { Professional } from '~/types/index'

defineProps<{
  professional: Professional
}>()
</script>

<template>
  <UPageHeader
    :title="professional.name"
    :description="professional.profession"
    class="mb-6"
  >
    <template #headline>
      <UAvatar
        :src="professional.avatar"
        :alt="`Foto de ${professional.name}`"
        size="2xl"
        :width="96"
        :height="96"
        rounded="full"
      />
    </template>
    <template #links>
      <div
        class="flex flex-col justify-end space-y-2"
        role="group"
        :aria-label="`Avaliação e distância de ${professional.name}`"
      >
        <UBadge
          color="warning"
          variant="subtle"
          size="sm"
          icon="i-heroicons-star-20-solid"
          :aria-label="`Avaliação média: ${professional.averageRating.toFixed(1)} de 5`"
          class="w-fit"
        >
          {{ professional.averageRating.toFixed(1) }}
        </UBadge>
        <UBadge
          color="info"
          variant="subtle"
          size="sm"
          icon="i-heroicons-map-pin"
          :aria-label="`Distância: ${professional.distanceKm} quilômetros`"
        >
          {{ professional.location ? `${professional.location.city}, ${professional.location.state} - ${professional.distanceKm} ` : undefined }} KM
        </UBadge>
      </div>
    </template>
  </UPageHeader>
</template>
