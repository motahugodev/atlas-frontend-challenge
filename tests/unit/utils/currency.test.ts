import { describe, expect, it } from 'vitest'
import { formatCurrency } from '~/utils/currency'

describe('formatCurrency', () => {
  it('formata valor inteiro em BRL', () => {
    const result = formatCurrency(150)
    expect(result).toContain('150')
    expect(result).toContain('R$')
  })

  it('formata zero corretamente', () => {
    const result = formatCurrency(0)
    expect(result).toContain('R$')
    expect(result).toContain('0')
  })

  it('formata valor com centavos', () => {
    const result = formatCurrency(1500.5)
    expect(result).toContain('1.500')
    expect(result).toContain('50')
  })

  it('formata valor alto com separador de milhar', () => {
    const result = formatCurrency(10000)
    expect(result).toContain('10.000')
  })

  it('formata valor mínimo positivo', () => {
    const result = formatCurrency(0.01)
    expect(result).toContain('R$')
  })

  it('retorna string', () => {
    expect(typeof formatCurrency(100)).toBe('string')
  })
})
