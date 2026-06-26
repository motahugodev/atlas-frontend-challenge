<script setup lang="ts">
import type { Location, Review } from '~/types'
import { formatCurrency } from '~/utils/currency'

interface Props {
  avatar?: string
  averageRating: number
  description: string
  distanceKm?: number
  id: string
  location: Location
  name: string
  profession: string
  providedServices: string[]
  reviews: Review[]
  serviceValue: number
}

withDefaults(defineProps<Props>(), {
  avatar: '',
  distanceKm: undefined
})

const isOpen = ref<boolean>(false)
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
            <div class="flex flex-1 justify-between items-center space-x-2">
              <UUser
                :name="name"
                :description="profession"
                :avatar="{
                  src: avatar,
                  alt: `Foto de perfil de ${name}`,
                  width: 80,
                  height: 80,
                  loading: 'lazy'
                }"
              />
              <div>
                <div
                  class="flex flex-col space-y-0.5"
                  role="group"
                  :aria-label="`Avaliação e distância de ${name}`"
                >
                  <UBadge
                    color="warning"
                    variant="subtle"
                    size="sm"
                    icon="i-heroicons-star-20-solid"
                    :aria-label="`Avaliação média: ${averageRating.toFixed(1)} de 5`"
                    class="w-fit"
                  >
                    {{ averageRating.toFixed(1) }}
                  </UBadge>
                  <UBadge
                    color="info"
                    variant="subtle"
                    size="sm"
                    icon="i-heroicons-map-pin"
                    :aria-label="`Distância: ${distanceKm} quilômetros`"
                  >
                    {{ location ? `${location.city}, ${location.state} - ${distanceKm} ` : undefined }} KM
                  </UBadge>
                </div>
              </div>
            </div>
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
            title="Serviços"
            variant="soft"
            icon="i-heroicons-document-text"
            class="w-full"
          >
            <ul
              v-if="providedServices.length"
              class="flex flex-wrap gap-2 list-none p-0 m-0"
              aria-label="Serviços prestados"
            >
              <li
                v-for="service in providedServices"
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
