import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { nextTick } from 'vue'
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

async function mountOpen(props = mockProps): Promise<ReturnType<typeof mountSuspended>> {
  const wrapper = await mountSuspended(ProfessionalPreview, {
    attachTo: document.body,
    props,
    slots: { default: '<button data-testid="open-drawer">Abrir</button>' }
  })
  await wrapper.find('[data-testid="open-drawer"]').trigger('click')
  await nextTick()
  return wrapper
}

describe('ProfessionalPreview', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renderiza sem erros', async () => {
    const wrapper = await mountSuspended(ProfessionalPreview, {
      attachTo: document.body,
      props: mockProps
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o nome do profissional', async () => {
    await mountOpen()
    expect(document.body.textContent).toContain('Ana Silva')
  })

  it('exibe a profissão', async () => {
    await mountOpen()
    expect(document.body.textContent).toContain('Fotógrafa Profissional')
  })

  it('exibe a avaliação média formatada', async () => {
    await mountOpen()
    expect(document.body.textContent).toContain('4.5')
  })

  it('badge de avaliação tem aria-label correto', async () => {
    await mountOpen()
    const badge = document.body.querySelector('[aria-label*="Avaliação média"]')
    expect(badge).not.toBeNull()
  })

  it('exibe a distância em KM', async () => {
    await mountOpen()
    expect(document.body.textContent).toContain('3')
    expect(document.body.textContent).toContain('KM')
  })

  it('badge de distância tem aria-label correto', async () => {
    await mountOpen()
    const badge = document.body.querySelector('[aria-label*="Distância"]')
    expect(badge).not.toBeNull()
  })

  it('exibe o valor do serviço formatado', async () => {
    await mountOpen()
    expect(document.body.textContent).toContain('R$')
    expect(document.body.textContent).toContain('250')
  })

  it('exibe a localização', async () => {
    await mountOpen()
    expect(document.body.textContent).toContain('São Paulo')
    expect(document.body.textContent).toContain('SP')
  })

  it('exibe a descrição', async () => {
    await mountOpen()
    expect(document.body.textContent).toContain('Fotógrafa com 10 anos de experiência.')
  })

  it('exibe os serviços prestados', async () => {
    await mountOpen()
    expect(document.body.textContent).toContain('Ensaio Externo')
    expect(document.body.textContent).toContain('Ensaio de Família')
  })

  it('lista de serviços tem aria-label acessível', async () => {
    await mountOpen()
    const list = document.body.querySelector('[aria-label="Serviços prestados"]')
    expect(list).not.toBeNull()
  })

  it('não exibe lista de serviços quando providedServices está vazio', async () => {
    await mountOpen({ ...mockProps, providedServices: [] })
    const list = document.body.querySelector('[aria-label="Serviços prestados"]')
    expect(list).toBeNull()
  })
})
