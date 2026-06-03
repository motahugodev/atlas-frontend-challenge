<script setup lang="ts">
import type { AutocompleteItem } from '~/types/index'
import { useRoute } from 'vue-router'

const route = useRoute()

interface SuggestionItem {
  value: string
  label: string
  description: string
}

const emit = defineEmits<{
  (e: 'select', item: AutocompleteItem): void
  (e: 'search', item: string): void
}>()

// Instancia a lógica do nosso composable
const { query, suggestions, isLoading, isOpen } = useAutocomplete()

const suggestionsCustom = computed(() => {
  return suggestions.value.map(item => ({
    value: item.id,
    label: item.name,
    description: item.profession
  })) || []
})

const handleSelect = (item: string): void => {
  query.value = item
  isOpen.value = false
  emit('search', item)
}
const handleSelectAutocomplete = (item: SuggestionItem): void => {
  isOpen.value = false

  const selectedItem: AutocompleteItem = {
    id: item.value,
    name: item.label,
    profession: item.description
  }
  emit('select', selectedItem)
}
onMounted(() => {
  const initialSearch = typeof route.query.search === 'string' ? route.query.search : ''
  if (initialSearch) {
    query.value = initialSearch
    emit('search', initialSearch)
  }
})
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <UPopover
      v-model:open="isOpen"
      mode="click"
      :popper="{ placement: 'bottom-start', arrow: false }"
      class="w-full"
    >
      <UInput
        v-model="query"
        type="text"
        placeholder="Search professional or industry..."
        size="lg"
        class="w-full"
        :loading="isLoading"
        @focus="isOpen = suggestions.length > 0"
      >
        <template #trailing>
          <UTooltip
            text="Pequisar profissionais"
            :content="{ side: 'right' }"
          >
            <UButton
              color="success"
              variant="link"
              size="lg"
              icon="i-heroicons-magnifying-glass"
              aria-label="Pequisar profissionais ou indústrias"
              @click="handleSelect(query)"
            />
          </UTooltip>
        </template>
      </UInput>
      <template #content>
        <UListbox
          v-if="suggestionsCustom.length > 0"
          :value="query"
          :items="suggestionsCustom"
          class="size-full"
          @update:model-value="handleSelectAutocomplete"
        />
        <UEmpty
          v-else
          title="Nenhum item foi encontrado."
          description="Tente ajustar sua busca para encontrar profissionais ou indústrias."
        />
      </template>
    </UPopover>
  </div>
</template>
