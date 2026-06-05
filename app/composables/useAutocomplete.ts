import { ref } from 'vue'
import type { AutocompleteItem } from '~/types/index'
import { watchDebounced } from '@vueuse/core'

export function useAutocomplete() {
  const query = ref<string>('')
  const apiQuery = ref<string>('')

  const { data: suggestions, status, refresh } = useLazyFetch<AutocompleteItem[]>('/api/professionals/autocomplete', {
    key: 'autocomplete',
    query: { query: apiQuery },
    immediate: false,
    server: false

  })

  watchDebounced(
    query,
    (newQuery) => {
      if (!newQuery.trim()) {
        apiQuery.value = ''
        return
      }

      apiQuery.value = newQuery
      refresh()
    },
    { debounce: 500 }
  )

  const isLoading = computed(() => status.value === 'pending')

  const reset = () => {
    query.value = ''
  }

  return {
    query,
    suggestions,
    isLoading,
    reset
  }
}
