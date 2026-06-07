import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import type { Professional } from '~/types/index'

const mockProfessional: Professional = {
  availability: ['Monday', 'Tuesday', 'Wednesday'],
  avatar: 'https://example.com/avatar.jpg',
  averageRating: 4.8,
  description: 'Especialista em instalações elétricas residenciais.',
  distanceKm: 3.2,
  id: '1',
  location: { city: 'Curitiba', state: 'PR' },
  name: 'João Ferreira',
  photoGallery: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
  profession: 'Eletricista Residencial',
  providedServices: ['Instalação Elétrica', 'Manutenção', 'Laudo Técnico'],
  reviews: [
    { author: 'Carla', comment: 'Ótimo serviço!', rating: 5 },
    { author: 'Pedro', comment: 'Muito profissional.', rating: 4.5 }
  ],
  serviceValue: 180
}

mockNuxtImport('useFetch', () => {
  return vi.fn(() => Promise.resolve({
    data: ref(mockProfessional),
    error: ref(null),
    execute: vi.fn(),
    pending: ref(false),
    refresh: vi.fn(),
    status: ref('success')
  }))
})

describe('Integração: Página Professional Detail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza a página de detalhe sem erros', async () => {
    const DetailPage = (await import('~/pages/professional/[id].vue')).default
    const wrapper = await mountSuspended(DetailPage, {
      route: '/professional/1'
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o nome do profissional', async () => {
    const DetailPage = (await import('~/pages/professional/[id].vue')).default
    const wrapper = await mountSuspended(DetailPage, {
      route: '/professional/1'
    })
    expect(wrapper.text()).toContain('João Ferreira')
  })

  it('exibe a profissão', async () => {
    const DetailPage = (await import('~/pages/professional/[id].vue')).default
    const wrapper = await mountSuspended(DetailPage, {
      route: '/professional/1'
    })
    expect(wrapper.text()).toContain('Eletricista Residencial')
  })

  it('exibe a galeria de fotos', async () => {
    const DetailPage = (await import('~/pages/professional/[id].vue')).default
    const wrapper = await mountSuspended(DetailPage, {
      route: '/professional/1'
    })
    expect(wrapper.text()).toContain('Galeria de Fotos')
  })

  it('exibe o valor do serviço', async () => {
    const DetailPage = (await import('~/pages/professional/[id].vue')).default
    const wrapper = await mountSuspended(DetailPage, {
      route: '/professional/1'
    })
    expect(wrapper.text()).toContain('180')
  })

  it('exibe a descrição do profissional', async () => {
    const DetailPage = (await import('~/pages/professional/[id].vue')).default
    const wrapper = await mountSuspended(DetailPage, {
      route: '/professional/1'
    })
    expect(wrapper.text()).toContain('instalações elétricas residenciais')
  })
})
