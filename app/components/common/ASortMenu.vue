<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  // Permite passar uma opção inicial selecionada
  sort?: string
}>(), {
  sort: 'relevance'
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
  { icon: 'i-heroicons-star', label: 'Melhor Avaliação', value: 'rating' },
  { icon: 'i-heroicons-map-pin', label: 'Mais Próximo', value: 'distance' }
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
