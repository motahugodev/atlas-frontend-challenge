import { professionals } from '../../data/professionals'

export default defineEventHandler((event) => {
  const { limit = '12', page = '1', search = '', sort = '' } = getQuery(event)

  let data = [...professionals]

  if (search) {
    const q = String(search).toLowerCase()
    data = data.filter(p =>
      p.name.toLowerCase().includes(q) || p.profession.toLowerCase().includes(q)
    )
  }

  if (sort) {
    data.sort((a, b) => {
      switch (String(sort)) {
        case 'price_asc': return a.serviceValue - b.serviceValue
        case 'price_desc': return b.serviceValue - a.serviceValue
        case 'rating_desc': return (b.averageRating ?? 0) - (a.averageRating ?? 0)
        case 'distance_asc': return (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity)
        default: return 0
      }
    })
  }

  const p = parseInt(String(page))
  const l = parseInt(String(limit))
  const start = (p - 1) * l
  const totalRecords = data.length

  return {
    data: data.slice(start, start + l).map(({ availability: _av, photoGallery: _pg, ...card }) => card),
    meta: {
      currentPage: p,
      limit: l,
      totalPages: Math.ceil(totalRecords / l),
      totalRecords
    }
  }
})
