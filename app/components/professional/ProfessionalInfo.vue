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
        title="Serviços"
        variant="soft"
        icon="i-heroicons-wrench-screwdriver"
        class="w-full"
      >
        <ul
          v-if="professional.providedServices.length"
          class="flex flex-wrap gap-2 list-none p-0 m-0"
          aria-label="Serviços prestados"
        >
          <li
            v-for="service in professional.providedServices"
            :key="service"
          >
            <UBadge
              color="neutral"
              variant="subtle"
              size="sm"
              class="font-bold"
            >
              {{ service }}
            </UBadge>
          </li>
        </ul>
      </UPageCard>
      <UPageCard
        title="Descrição"
        :description="professional.description"
        variant="soft"
        icon="i-heroicons-document-text"
      />
    </div>
  </section>
</template>
