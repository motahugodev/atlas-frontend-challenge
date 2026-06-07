// Formatador nativo e performático para a moeda local
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  }).format(value)
}
