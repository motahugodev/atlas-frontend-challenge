<template>
  <UPageCard
    title="Avaliações"
    icon="i-heroicons-star-solid"
    variant="soft"
    class="w-full"
  >
    <UMarquee
      pause-on-hover
      :overlay="false"
      :repeat="2"
      :ui="{ root: '[--gap:--spacing(4)]', content: 'w-auto py-1 overflow-hidden relative' }"
    >
      <UPageCard
        v-for="review in reviews"
        :key="`review-${review.author}-${review.rating}`"
        :description="review.comment"
        :ui="{
          description: 'before:content-[open-quote] after:content-[close-quote] line-clamp-2 text-sm'
        }"
        class="w-64 shrink-0"
      >
        <template #footer>
          <UUser
            :name="review.author"
            :avatar="{ alt: review.author }"
            :ui="{ description: 'line-clamp-1 text-sm' }"
          />
        </template>
      </UPageCard>
    </Umarquee>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Review } from '~/types'

defineProps<{
  reviews: Review[] | undefined
}>()
</script>
