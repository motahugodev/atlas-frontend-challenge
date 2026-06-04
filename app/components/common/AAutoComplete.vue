<script setup lang="ts">
import type { AutocompleteItem } from '~/types/index'

interface SuggestionItem {
  value: string
  label: string
  description: string
}

const props = withDefaults(
  defineProps<{ search?: string }>(),
  { search: '' }
)

const emit = defineEmits<{
  (e: 'select', item: AutocompleteItem): void
  (e: 'update:search', item: string): void
}>()

const { query, suggestions, isLoading, isOpen } = useAutocomplete()

const suggestionsCustom = computed(() => {
  return suggestions.value?.map(item => ({
    value: item.id,
    label: item.name,
    description: item.profession
  })) || []
})

const handleSelect = (item: string): void => {
  query.value = item
  isOpen.value = false
  emit('update:search', item)
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

watch(() => props.search, (newValue) => {
  query.value = String(newValue)
}, {
  immediate: true
})
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <ClientOnly>
      <UPopover
        v-model:open="isOpen"
        mode="click"
        :popper="{ placement: 'bottom-start', arrow: false }"
        class="w-full"
      >
        <UInput
          v-model="query"
          type="text"
          aria-label="Pesquisar"
          placeholder="Pesquisar profissional ou indústria..."
          size="lg"
          class="w-full"
          :loading="isLoading"
          @focus="isOpen = suggestionsCustom.length > 0"
          @keyup.enter="handleSelect(query)"
        >
          <template #trailing>
            <UTooltip
              text="Pesquisar profissionais"
              :content="{ side: 'right' }"
            >
              <UButton
                color="success"
                variant="link"
                size="lg"
                icon="i-heroicons-magnifying-glass"
                aria-label="Pesquisar profissionais ou indústrias"
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

      <template #fallback>
        <div class="w-full h-[44px] bg-default animate-pulse rounded-md" />
      </template>
    </ClientOnly>
  </div>
</template>
