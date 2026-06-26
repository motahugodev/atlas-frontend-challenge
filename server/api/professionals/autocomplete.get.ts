import { professionals } from '../../data/professionals'

export default defineEventHandler((event) => {
  const { query = '' } = getQuery(event)
  if (!query) {
    return []
  }

  const q = String(query).toLowerCase()
  return professionals
    .filter(p => p.name.toLowerCase().includes(q) || p.profession.toLowerCase().includes(q))
    .slice(0, 7)
    .map(({ id, name, profession }) => ({ id, name, profession }))
})
