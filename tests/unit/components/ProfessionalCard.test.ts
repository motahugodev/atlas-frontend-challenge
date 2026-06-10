import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalCard from '~/components/professional/ProfessionalCard.vue'
import type { ProfessionalCard as ProfessionalCardType } from '~/types/index'

const mockProfessional: ProfessionalCardType = {
  avatar: 'https://example.com/avatar.jpg',
  averageRating: 4.5,
  description: 'Fotógrafa com 10 anos de experiência.',
  distanceKm: 3,
  id: '1',
  location: { city: 'São Paulo', state: 'SP' },
  name: 'Ana Silva',
  profession: 'Fotógrafa Profissional',
  providedServices: ['Ensaio Externo', 'Ensaio de Família'],
  reviews: [
    { author: 'João', comment: 'Excelente!', rating: 5 }
  ],
  serviceValue: 250
}

describe('ProfessionalCard', () => {
  it('renderiza sem erros', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o nome do profissional', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    expect(wrapper.text()).toContain('Ana Silva')
  })

  it('exibe a profissão', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    expect(wrapper.text()).toContain('Fotógrafa Profissional')
  })

  it('exibe o valor do serviço formatado', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    expect(wrapper.text()).toContain('250')
    expect(wrapper.text()).toContain('R$')
  })

  it('exibe label "Valor do Serviço"', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    expect(wrapper.text()).toContain('Valor do Serviço')
  })

  it('aria-label do valor do serviço está correto', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    const el = wrapper.find('[aria-label*="Valor do serviço prestado"]')
    expect(el.exists()).toBe(true)
  })

  it('exibe botão "Ver mais"', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    expect(wrapper.text()).toContain('Ver mais')
  })

  it('o botão de contratar tem aria-label com o nome do profissional', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    const btn = wrapper.find('[aria-label*="Ana Silva"]')
    expect(btn.exists()).toBe(true)
  })

  it('exibe os serviços prestados', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    expect(wrapper.text()).toContain('Ensaio Externo')
    expect(wrapper.text()).toContain('Ensaio de Família')
  })

  it('lista de serviços tem aria-label acessível', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    const list = wrapper.find('[aria-label="Serviços prestados"]')
    expect(list.exists()).toBe(true)
  })

  it('não exibe lista de serviços quando providedServices está vazio', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: { ...mockProfessional, providedServices: [] } }
    })
    const list = wrapper.find('[aria-label="Serviços prestados"]')
    expect(list.exists()).toBe(false)
  })

  it('card tem role article com aria-label do profissional', async () => {
    const wrapper = await mountSuspended(ProfessionalCard, {
      props: { professional: mockProfessional }
    })
    const article = wrapper.find('article')
    expect(article.exists()).toBe(true)
    expect(article.attributes('aria-label')).toContain('Ana Silva')
  })
})
