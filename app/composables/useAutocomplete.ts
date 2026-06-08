import { ref } from 'vue'
import type { AutocompleteItem } from '~/types/index'
import { watchDebounced } from '@vueuse/core'

export function useAutocomplete() {
  const query = ref<string>('')
  const apiQuery = ref<string>('')

  const { data: suggestions, refresh, status } = useLazyFetch<AutocompleteItem[]>('/api/professionals/autocomplete', {
    immediate: false,
    key: 'autocomplete',
    query: { query: apiQuery },
    server: false

  })

  const isLoading = computed<boolean>(() => status.value === 'pending')

  watchDebounced(
    query,
    (newQuery: string) => {
      if (!newQuery.trim()) {
        apiQuery.value = ''
        return
      }

      apiQuery.value = newQuery
      refresh()
    },
    { debounce: 500 }
  )

  const reset = () => {
    query.value = ''
  }

  return {
    isLoading,
    query,
    reset,
    suggestions
  }
}
