import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProfessionalList from '~/components/professional/ProfessionalList.vue'
import type { ProfessionalCard } from '~/types/index'

const makeProfessional = (id: string): ProfessionalCard => ({
  avatar: `https://example.com/avatar${id}.jpg`,
  averageRating: 4.0,
  description: 'Descrição do profissional.',
  id,
  location: { city: 'Rio de Janeiro', state: 'RJ' },
  name: `Profissional ${id}`,
  profession: 'Eletricista',
  providedServices: [],
  reviews: [],
  serviceValue: 100 * Number(id)
})

const professionals = [makeProfessional('1'), makeProfessional('2'), makeProfessional('3')]

describe('ProfessionalList', () => {
  it('renderiza sem erros', async () => {
    const wrapper = await mountSuspended(ProfessionalList, {
      props: { professionals: [], status: 'idle' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe skeletons quando status é "pending"', async () => {
    const wrapper = await mountSuspended(ProfessionalList, {
      props: { professionals: [], status: 'pending' }
    })
    const list = wrapper.find('ul[aria-label="Lista de profissionais"]')
    expect(list.exists()).toBe(true)
    // Renderiza 8 skeletons conforme a implementação
    const items = list.findAll('li')
    expect(items).toHaveLength(12)
  })

  it('exibe skeletons quando status é "idle"', async () => {
    const wrapper = await mountSuspended(ProfessionalList, {
      props: { professionals: [], status: 'idle' }
    })
    const list = wrapper.find('ul[aria-label="Lista de profissionais"]')
    expect(list.exists()).toBe(true)
  })

  it('exibe os cards de profissionais quando status é "success"', async () => {
    const wrapper = await mountSuspended(ProfessionalList, {
      props: { professionals, status: 'success' }
    })
    const list = wrapper.find('ul[aria-label="Lista de profissionais"]')
    const items = list.findAll('li')
    expect(items).toHaveLength(3)
  })

  it('exibe estado vazio quando não há profissionais e status é "success"', async () => {
    const wrapper = await mountSuspended(ProfessionalList, {
      props: { professionals: [], status: 'success' }
    })
    expect(wrapper.text()).toContain('Nenhum profissional encontrado')
  })

  it('exibe mensagem de erro quando status é "error"', async () => {
    const wrapper = await mountSuspended(ProfessionalList, {
      props: { professionals: [], status: 'error' }
    })
    expect(wrapper.text()).toContain('Erro ao carregar dados')
  })

  it('seção tem role de alerta para estado vazio', async () => {
    const wrapper = await mountSuspended(ProfessionalList, {
      props: { professionals: [], status: 'success' }
    })
    const alertEl = wrapper.find('[role="alert"]')
    expect(alertEl.exists()).toBe(true)
  })

  it('renderiza slot footer quando fornecido', async () => {
    const wrapper = await mountSuspended(ProfessionalList, {
      props: { professionals, status: 'success' },
      slots: {
        footer: '<button data-testid="paginacao">Próxima página</button>'
      }
    })
    expect(wrapper.find('[data-testid="paginacao"]').exists()).toBe(true)
  })
})
