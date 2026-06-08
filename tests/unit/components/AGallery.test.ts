import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AGallery from '~/components/common/AGallery.vue'

const mockItems = [
  'https://example.com/photo1.jpg',
  'https://example.com/photo2.jpg',
  'https://example.com/photo3.jpg'
]

describe('AGallery', () => {
  it('renderiza sem erros com items vazios', async () => {
    const wrapper = await mountSuspended(AGallery, {
      props: { items: [] }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza com a lista de items', async () => {
    const wrapper = await mountSuspended(AGallery, {
      props: { items: mockItems }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza o número correto de botões de miniatura', async () => {
    const wrapper = await mountSuspended(AGallery, {
      props: { items: mockItems }
    })
    // Seleciona apenas botões de thumbnail (têm aria-label "Ver foto N")
    const buttons = wrapper.findAll('button[aria-label^="Ver foto"]')
    expect(buttons).toHaveLength(mockItems.length)
  })

  it('primeiro botão tem aria-pressed="true" (índice ativo inicial é 0)', async () => {
    const wrapper = await mountSuspended(AGallery, {
      props: { items: mockItems }
    })
    const firstButton = wrapper.find('button[aria-label="Ver foto 1"]')
    expect(firstButton.attributes('aria-pressed')).toBe('true')
  })

  it('botões têm aria-label correto', async () => {
    const wrapper = await mountSuspended(AGallery, {
      props: { items: mockItems }
    })
    expect(wrapper.find('button[aria-label="Ver foto 1"]').exists()).toBe(true)
    expect(wrapper.find('button[aria-label="Ver foto 2"]').exists()).toBe(true)
    expect(wrapper.find('button[aria-label="Ver foto 3"]').exists()).toBe(true)
  })

  it('clique em miniatura atualiza o índice ativo', async () => {
    const wrapper = await mountSuspended(AGallery, {
      props: { items: mockItems }
    })

    const btn1 = wrapper.find('button[aria-label="Ver foto 1"]')
    const btn2 = wrapper.find('button[aria-label="Ver foto 2"]')

    await btn2.trigger('click')

    // Após clicar no segundo botão, o segundo deve ter aria-pressed="true"
    expect(btn2.attributes('aria-pressed')).toBe('true')
    expect(btn1.attributes('aria-pressed')).toBe('false')
  })

  it('título da galeria está presente', async () => {
    const wrapper = await mountSuspended(AGallery, {
      props: { items: mockItems }
    })
    expect(wrapper.text()).toContain('Galeria de Fotos')
  })
})
