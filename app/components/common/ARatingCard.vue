<template>
  <UCard
    class="max-w-sm min-w-1/4"
    variant="soft"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Avaliação Média
        </h3>
        <UBadge
          color="primary"
          variant="subtle"
          size="md"
          class="font-bold"
        >
          {{ rating.toFixed(1) }} / 5.0
        </UBadge>
      </div>
    </template>

    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <div class="flex items-center text-amber-500">
          <UIcon
            v-for="star in 5"
            :key="star"
            :name="star <= Math.round(rating) ? 'i-heroicons-star-20-solid' : 'i-heroicons-star-20'"
            class="w-5 h-5 flex-shrink-0"
          />
        </div>

        <span class="text-sm text-gray-500 dark:text-gray-400">
          ({{ totalReviews }} avaliações)
        </span>
      </div>
      <UProgress
        :model-value="rating > 5 ? 5 : rating.toFixed(0)"
        :max="5"
        color="primary"
        size="sm"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    rating?: number
    totalReviews?: number
  }>(),
  {
    rating: 0,
    totalReviews: 0
  }
)
</script>
