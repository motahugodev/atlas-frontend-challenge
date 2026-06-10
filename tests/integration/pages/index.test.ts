import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import type { ProfessionalCard } from '~/types/index'

const mockProfessionals: ProfessionalCard[] = [
  {
    avatar: 'https://example.com/avatar1.jpg',
    averageRating: 4.5,
    description: 'Especialista em eventos.',
    id: '1',
    location: { city: 'São Paulo', state: 'SP' },
    name: 'Carlos Oliveira',
    profession: 'Fotógrafo',
    providedServices: [],
    reviews: [],
    serviceValue: 300
  },
  {
    avatar: 'https://example.com/avatar2.jpg',
    averageRating: 4.2,
    description: 'Design gráfico criativo.',
    id: '2',
    location: { city: 'Belo Horizonte', state: 'MG' },
    name: 'Maria Santos',
    profession: 'Designer',
    providedServices: [],
    reviews: [],
    serviceValue: 200
  }
]

mockNuxtImport('usePagination', () => {
  return vi.fn(async () => ({
    error: ref(null),
    execute: vi.fn(),
    hasNext: ref(true),
    hasPrev: ref(false),
    items: ref(mockProfessionals),
    limit: ref(12),
    meta: ref({ currentPage: 1, limit: 12, totalPages: 3, totalRecords: 36 }),
    nextPage: vi.fn(),
    page: ref(1),
    pending: ref(false),
    prevPage: vi.fn(),
    refresh: vi.fn(),
    search: ref(''),
    setPage: vi.fn(),
    sort: ref('relevance'),
    status: ref('success')
  }))
})

mockNuxtImport('useAutocompleteStore', () => {
  return vi.fn(() => ({ search: '' }))
})

describe('Integração: Página Index', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza a página principal sem erros', async () => {
    const IndexPage = (await import('~/pages/index.vue')).default
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o título hero "Encontre seu profissional"', async () => {
    const IndexPage = (await import('~/pages/index.vue')).default
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('Encontre seu profissional')
  })

  it('exibe o menu de ordenação', async () => {
    const IndexPage = (await import('~/pages/index.vue')).default
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('Ordenar por:')
  })

  it('exibe a lista de profissionais', async () => {
    const IndexPage = (await import('~/pages/index.vue')).default
    const wrapper = await mountSuspended(IndexPage)
    const list = wrapper.find('[aria-label="Lista de profissionais"]')
    expect(list.exists()).toBe(true)
  })

  it('exibe os nomes dos profissionais mockados', async () => {
    const IndexPage = (await import('~/pages/index.vue')).default
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.text()).toContain('Carlos Oliveira')
    expect(wrapper.text()).toContain('Maria Santos')
  })

  it('exibe a paginação quando há múltiplas páginas', async () => {
    const IndexPage = (await import('~/pages/index.vue')).default
    const wrapper = await mountSuspended(IndexPage)
    const pagination = wrapper.find('[aria-label="Navegação de páginas"]')
    expect(pagination.exists()).toBe(true)
  })
})
