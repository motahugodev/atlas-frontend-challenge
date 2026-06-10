import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ASortMenu from '~/components/common/ASortMenu.vue'

describe('ASortMenu', () => {
  it('renderiza sem erros', async () => {
    const wrapper = await mountSuspended(ASortMenu)
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe label "Ordenar por:"', async () => {
    const wrapper = await mountSuspended(ASortMenu)
    expect(wrapper.text()).toContain('Ordenar por:')
  })

  it('usa "relevance" como valor padrão de sort', async () => {
    const wrapper = await mountSuspended(ASortMenu)
    // O aria-label deve conter o nome da opção padrão
    const container = wrapper.find('[aria-label*="Relevância"]')
    expect(container.exists()).toBe(true)
  })

  it('aria-label reflete o sort selecionado (price_asc)', async () => {
    const wrapper = await mountSuspended(ASortMenu, {
      props: { sort: 'price_asc' }
    })
    const container = wrapper.find('[aria-label*="Menor Preço"]')
    expect(container.exists()).toBe(true)
  })

  it('aria-label reflete o sort selecionado (rating)', async () => {
    const wrapper = await mountSuspended(ASortMenu, {
      props: { sort: 'rating_desc' }
    })
    const container = wrapper.find('[aria-label*="Melhor Avaliação"]')
    expect(container.exists()).toBe(true)
  })

  it('aria-label reflete o sort selecionado (distance)', async () => {
    const wrapper = await mountSuspended(ASortMenu, {
      props: { sort: 'distance_asc' }
    })
    const container = wrapper.find('[aria-label*="Mais Próximo"]')
    expect(container.exists()).toBe(true)
  })

  it('exibe "Selecione uma opção" para sort inválido', async () => {
    const wrapper = await mountSuspended(ASortMenu, {
      props: { sort: 'unknown_option' }
    })
    const container = wrapper.find('[aria-label*="Selecione uma opção"]')
    expect(container.exists()).toBe(true)
  })
})
