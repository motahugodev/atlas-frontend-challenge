<script setup lang="ts">
import type { AutocompleteItem } from '~/types/index'

interface SuggestionItem {
  label?: string
  suffix?: string
  value?: string
}

const props = withDefaults(
  defineProps<{ search?: string }>(),
  { search: '' }
)

const emit = defineEmits<{
  (e: 'select', item: AutocompleteItem): void
  (e: 'update:search', item: string): void
}>()

const { isLoading, query, suggestions } = useAutocomplete()

const suggestionsCustom = computed(() => {
  const items = suggestions.value?.map(item => ({
    label: item.name,
    suffix: item.profession,
    value: item.id
  })) || []

  const group = suggestions.value?.map(item => ({
    label: item.profession,
    value: item.id
  })).filter((item, index, self) =>
    index === self.findIndex(obj => obj.label === item.label)
  ) || []

  return [{
    id: 'category',
    ignoreFilter: true,
    items: group

  }, {
    id: 'users',
    ignoreFilter: true,
    items

  }]
})

const handlerOption = async (currentQuery?: SuggestionItem): Promise<void> => {
  if (!currentQuery) {
    emit('update:search', query.value)
  }
  else {
    query.value = String(currentQuery)
    emit('update:search', query.value)
  }
}

watch(() => props.search, (newValue: string) => {
  query.value = String(newValue)
}, {
  immediate: true
})
</script>

<template>
  <UPageCard>
    <UCommandPalette
      v-model:search-term="query"
      :groups="suggestionsCustom"
      :loading="isLoading"
      size="sm"
      value-key="label"
      placeholder="Digite para buscar..."
      @update:model-value="event => handlerOption(event)"
    >
      <template #close>
        <UTooltip
          text="Pesquisar profissionais"
          :content="{ side: 'right' }"
        >
          <UButton
            color="success"
            variant="solid"
            size="lg"
            icon="i-heroicons-magnifying-glass"
            aria-label="Pesquisar profissionais ou indústrias"
            class="mt-1.5"
            @click="handlerOption()"
          />
        </UTooltip>
      </template>
    </UCommandPalette>
  </UPageCard>
</template>
