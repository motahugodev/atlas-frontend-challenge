import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'

const mockRefresh = vi.fn()
const mockStatus = ref('idle')
const mockData = ref(null)

mockNuxtImport('useLazyFetch', () => {
  return () => ({
    data: mockData,
    refresh: mockRefresh,
    status: mockStatus
  })
})

describe('useAutocomplete', () => {
  it('inicializa com query vazia', async () => {
    const { useAutocomplete } = await import('~/composables/useAutocomplete')
    const { query } = useAutocomplete()
    expect(query.value).toBe('')
  })

  it('reset limpa a query', async () => {
    const { useAutocomplete } = await import('~/composables/useAutocomplete')
    const { query, reset } = useAutocomplete()
    query.value = 'fotógrafo'
    reset()
    expect(query.value).toBe('')
  })

  it('suggestions inicia como null quando API não retornou dados', async () => {
    mockData.value = null
    const { useAutocomplete } = await import('~/composables/useAutocomplete')
    const { suggestions } = useAutocomplete()
    expect(suggestions.value).toBeNull()
  })

  it('isLoading é false quando status é "idle"', async () => {
    mockStatus.value = 'idle'
    const { useAutocomplete } = await import('~/composables/useAutocomplete')
    const { isLoading } = useAutocomplete()
    expect(isLoading.value).toBe(false)
  })

  it('isLoading é true quando status é "pending"', async () => {
    mockStatus.value = 'pending'
    const { useAutocomplete } = await import('~/composables/useAutocomplete')
    const { isLoading } = useAutocomplete()
    expect(isLoading.value).toBe(true)
  })
})
