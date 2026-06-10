import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalPreview from '~/components/professional/ProfessionalPreview.vue'
import type { Location, Review } from '~/types'

const mockProps = {
  avatar: 'https://example.com/avatar.jpg',
  averageRating: 4.5,
  description: 'Fotógrafa com 10 anos de experiência.',
  distanceKm: 3,
  id: '1',
  location: { city: 'São Paulo', state: 'SP' } as Location,
  name: 'Ana Silva',
  profession: 'Fotógrafa Profissional',
  providedServices: ['Ensaio Externo', 'Ensaio de Família'],
  reviews: [{ author: 'João', comment: 'Excelente!', rating: 5 }] as Review[],
  serviceValue: 250
}

describe('ProfessionalPreview', () => {
  it('renderiza sem erros', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o nome do profissional', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.text()).toContain('Ana Silva')
  })

  it('exibe a profissão', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.text()).toContain('Fotógrafa Profissional')
  })

  it('exibe a avaliação média formatada', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.text()).toContain('4.5')
  })

  it('badge de avaliação tem aria-label correto', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    const badge = wrapper.find('[aria-label*="Avaliação média"]')
    expect(badge.exists()).toBe(true)
  })

  it('exibe a distância em KM', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('KM')
  })

  it('badge de distância tem aria-label correto', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    const badge = wrapper.find('[aria-label*="Distância"]')
    expect(badge.exists()).toBe(true)
  })

  it('exibe o valor do serviço formatado', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.text()).toContain('R$')
    expect(wrapper.text()).toContain('250')
  })

  it('exibe a localização', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.text()).toContain('São Paulo')
    expect(wrapper.text()).toContain('SP')
  })

  it('exibe a descrição', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.text()).toContain('Fotógrafa com 10 anos de experiência.')
  })

  it('exibe os serviços prestados', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    expect(wrapper.text()).toContain('Ensaio Externo')
    expect(wrapper.text()).toContain('Ensaio de Família')
  })

  it('lista de serviços tem aria-label acessível', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: mockProps
    })
    const list = wrapper.find('[aria-label="Serviços prestados"]')
    expect(list.exists()).toBe(true)
  })

  it('não exibe lista de serviços quando providedServices está vazio', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      props: { ...mockProps, providedServices: [] }
    })
    const list = wrapper.find('[aria-label="Serviços prestados"]')
    expect(list.exists()).toBe(false)
  })
})
