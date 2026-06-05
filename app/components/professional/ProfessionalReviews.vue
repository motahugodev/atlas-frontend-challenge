<script setup lang="ts">
import type { Professional } from '~/types/index'

defineProps<{
  professional: Professional
}>()
</script>

<template>
  <section
    aria-label="Avaliações"
    class="flex flex-col gap-4 md:flex-row"
  >
    <ARatingCard
      :rating="professional.serviceValue || 0"
      :total-reviews="professional.reviews?.length || 0"
    />
    <ACarouselReview
      class="flex-1"
      :reviews="professional.reviews"
    />
  </section>
</template>
