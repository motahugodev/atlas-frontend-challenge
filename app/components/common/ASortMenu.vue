<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  sort?: string
  currentPage?: number
  totalPages?: number
}>(), {
  currentPage: 1,
  sort: 'relevance',
  totalPages: 1
})

// Emite o evento para o componente pai
const emit = defineEmits<{
  'update:sort': [value: string]
}>()

// Lista de opções
const sortOptions = [
  { icon: 'i-heroicons-sparkles', label: 'Relevância', value: 'relevance' },
  { icon: 'i-heroicons-arrow-trending-down', label: 'Menor Preço', value: 'price_asc' },
  { icon: 'i-heroicons-arrow-trending-up', label: 'Maior Preço', value: 'price_desc' },
  { icon: 'i-heroicons-star', label: 'Melhor Avaliação', value: 'rating_desc' },
  { icon: 'i-heroicons-map-pin', label: 'Mais Próximo', value: 'distance_asc' }
]

const sortName = computed<string>(() => {
  const option = sortOptions.find(opt => opt.value === props.sort)
  return option ? option.label : 'Selecione uma opção'
})

const selectedOption = computed({
  get: () => props.sort,
  set: (value) => {
    emit('update:sort', value)
  }
})
</script>

<template>
  <UPageCard>
    <div
      :aria-label="`Ordenar por: ${sortName}`"
      class="flex items-center gap-2"
    >
      <!-- Label opcional -->
      <div class="flex-1">
        <slot name="label" />
        <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
      </div>
      <span
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
      >
        Ordenar por:
      </span>
      <USelectMenu
        v-model="selectedOption"
        :items="sortOptions"
        option-attribute="label"
        value-key="value"
        class="w-48"
      />
    </div>
  </UPageCard>
</template>
