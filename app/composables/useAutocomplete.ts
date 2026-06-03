import { ref, watch } from 'vue'
import type { AutocompleteItem } from '~/types/index'

export function useAutocomplete() {
  const query = ref('')
  const suggestions = ref<AutocompleteItem[]>([])
  const isLoading = ref(false)
  const isOpen = ref(false)

  let debounceTimeout: NodeJS.Timeout

  watch(query, (newQuery) => {
    clearTimeout(debounceTimeout)

    if (!newQuery.trim()) {
      suggestions.value = []
      isOpen.value = false
      return
    }

    isLoading.value = true

    debounceTimeout = setTimeout(async () => {
      try {
        // Busca os dados na rota leve que criamos no Mirage JS
        const data = await $fetch<AutocompleteItem[]>('/api/professionals/autocomplete', {
          query: { query: newQuery }
        })

        suggestions.value = data
        isOpen.value = data.length > 0
      }
      catch (error) {
        console.error('Error fetching autocomplete:', error)
        suggestions.value = []
      }
      finally {
        isLoading.value = false
      }
    }, 300) // Debounce de 300ms
  })

  const reset = () => {
    query.value = ''
    suggestions.value = []
    isOpen.value = false
  }

  return {
    query,
    suggestions,
    isLoading,
    isOpen,
    reset
  }
}
