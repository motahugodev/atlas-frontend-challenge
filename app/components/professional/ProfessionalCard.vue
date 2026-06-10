<script setup lang="ts">
import type { ProfessionalCard } from '~/types/index'
import { formatCurrency } from '~/utils/currency'

const props = defineProps<{
  professional: ProfessionalCard
  priority?: boolean
}>()

const ProfessionalPreview = defineAsyncComponent(
  () => import('~/components/professional/ProfessionalPreview.vue')
)
</script>

<template>
  <article
    :aria-label="`Perfil de ${professional.name}, ${professional.profession}`"
  >
    <UCard class="max-w-sm w-full transition-shadow hover:shadow-md">
      <template #header>
        <div class="flex justify-between items-center space-x-2">
          <UUser
            :name="professional.name"
            :description="professional.profession"
            :avatar="{
              src: professional.avatar,
              alt: `Foto de perfil de ${professional.name}`,
              width: '96',
              height: '96',
              decoding: 'async',
              format: 'webp',
              fetchpriority: props.priority ? 'high' : 'auto',
              loading: props.priority ? 'eager' : 'lazy'
            }"
          />
          <div
            class="flex flex-col space-y-0.5"
            role="group"
            :aria-label="`Avaliação e distância de ${professional.name}`"
          >
            <UBadge
              color="warning"
              variant="subtle"
              size="xs"
              icon="i-heroicons-star-20-solid"
              :aria-label="`Avaliação média: ${professional.averageRating.toFixed(1)} de 5`"
              class="w-fit"
            >
              {{ professional.averageRating.toFixed(1) }}
            </UBadge>
            <UBadge
              color="info"
              variant="subtle"
              size="xs"
              icon="i-heroicons-map-pin"
              :aria-label="`Distância: ${professional.distanceKm} quilômetros`"
            >
              {{ professional.distanceKm }} KM
            </UBadge>
          </div>
        </div>
      </template>

      <div class="space-y-3">
        <p class="line-clamp-2 text-xs">
          {{ professional.description }}
        </p>

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

        <div class="flex flex-col items-end">
          <span class="sr-only">Valor do Serviço</span>
          <div
            :aria-label="`Valor do serviço prestado: ${formatCurrency(professional.serviceValue)}`"
            role="text"
          >
            <span
              class="mt-1 text-xl font-bold text-gray-900 dark:text-white"
              aria-hidden="true"
            >
              {{ formatCurrency(professional.serviceValue) }}
            </span>
          </div>
        </div>
      </div>

      <template #footer>
        <ProfessionalPreview
          :id="professional.id"
          :avatar="professional.avatar"
          :average-rating="professional.averageRating"
          :description="professional.description"
          :distance-km="professional.distanceKm"
          :location="professional.location"
          :name="professional.name"
          :profession="professional.profession"
          :provided-services="professional.providedServices"
          :reviews="professional.reviews"
          :service-value="professional.serviceValue"
        >
          <UButton
            block
            color="primary"
            variant="solid"
            :aria-label="`Ver mais sobre ${professional.name}`"
          >
            Ver mais
          </UButton>
        </ProfessionalPreview>
      </template>
    </UCard>
  </article>
</template>
