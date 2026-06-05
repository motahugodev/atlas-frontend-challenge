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
      <ul
        role="list"
        aria-label="Serviços oferecidos"
        class="flex flex-wrap gap-2"
      >
        <li
          v-for="service in professional.providedServices"
          :key="service"
        >
          <UBadge>{{ service }}</UBadge>
        </li>
      </ul>
    </template>
  </UPageHeader>
</template>
