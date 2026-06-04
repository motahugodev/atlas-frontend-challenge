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

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  // Permite passar uma opção inicial selecionada
  sort?: string
}>(), {
  sort: 'relevance'
})

// Lista de opções
const sortOptions = [
  { value: 'relevance', label: 'Relevância', icon: 'i-heroicons-sparkles' },
  { value: 'price_asc', label: 'Menor Preço', icon: 'i-heroicons-arrow-trending-down' },
  { value: 'price_desc', label: 'Maior Preço', icon: 'i-heroicons-arrow-trending-up' },
  { value: 'rating', label: 'Melhor Avaliação', icon: 'i-heroicons-star' },
  { value: 'distance', label: 'Mais Próximo', icon: 'i-heroicons-map-pin' }
]

// Emite o evento para o componente pai
const emit = defineEmits(['update:sort'])

const sortName = computed(() => {
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
