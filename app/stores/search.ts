import { defineStore } from 'pinia'

export const useAutocompleteStore = defineStore('search', () => {
  const search = ref('')

  return {
    search
  }
})
