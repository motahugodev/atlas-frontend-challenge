import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalCard from '~/components/professional/ProfessionalCard.vue'
import type { ProfessionalCard as ProfessionalCardType } from '~/types/index'

const mockProfessional: ProfessionalCardType = {
  avatar: 'https://example.com/avatar.jpg',
  description: 'Fotógrafa com 10 anos de experiência.',
  id: '1',
  location: { city: 'São Paulo', state: 'SP' },
  name: 'Ana Silva',
  profession: 'Fotógrafa Profissional',
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
})
