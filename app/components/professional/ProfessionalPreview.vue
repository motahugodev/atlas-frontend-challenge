<script setup lang="ts">
import type { Location, Review } from '~/types'
import { formatCurrency } from '~/utils/currency'

interface Props {
  avatar?: string
  description: string
  id: string
  location: Location
  name: string
  profession: string
  reviews: Review[]
  serviceValue: number
}

withDefaults(defineProps<Props>(), {
  avatar: ''
})

const isOpen = ref(false)
</script>

<template>
  <UDrawer
    v-model:open="isOpen"
    direction="right"
    :ui="{ content: 'max-w-2xl', overlay: 'bg-inverted/30' }"
  >
    <slot />
    <template #content>
      <UCard
        aria-roledescription="Painel de visualização de serviço"
        class="overflow-y-scroll"
      >
        <template #header>
          <div class="flex justify-between items-start sticky">
            <UUser
              :name="name"
              :alt="`Nome do profissional: ${name}`"
              :description="profession"
              :avatar="{
                src: avatar,
                width: '96',
                height: '96',
                loading: 'lazy',
                decoding: 'async',
                format: 'webp',
                fetchpriority: 'high'

              }"
            />
            <UButton
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              aria-label="Fechar painel de visualização"
              @click.prevent="isOpen = false"
            />
          </div>
        </template>

        <!-- CORPO: Detalhes, Localização e Avaliação -->
        <div class="space-y-4">
          <UPageCard
            title="Localização"
            :description="location ? `${location.city}, ${location.state}` : undefined"
            variant="soft"
            icon="i-heroicons-map-pin"
            class="w-full"
          />
          <UPageCard
            title="Descrição"
            :description="description"
            variant="soft"
            icon="i-heroicons-document-text"
            class="w-full"
          />
          <ACarouselReview :reviews="reviews" />
        </div>
        <template #footer>
          <div class="space-y-4">
            <div
              class="flex items-center justify-between"
              :aria-label="`Valor do serviço: ${formatCurrency(serviceValue)}`"
            >
              <h5 class="text-zinc-500 dark:text-zinc-400">
                Valor do serviço
              </h5>
              <p class="text-2xl font-black text-zinc-900 dark:text-white">
                {{ formatCurrency(serviceValue) }}
              </p>
            </div>
            <div class="flex flex-col md:flex-row gap-3">
              <UButton
                block
                size="lg"
                color="secondary"
                label="Ver mais detalhes"
                icon="i-heroicons-eye-solid"
                class="font-semibold"
                :to="`/professional/${id}`"
              />
              <UButton
                block
                size="lg"
                color="primary"
                label="Contratar serviço"
                icon="i-heroicons-calendar-days"
                class="font-semibold"
              />
            </div>
          </div>
        </template>
      </UCard>
    </template>
  </UDrawer>
</template>
