import { professionals } from '../../data/professionals'

export default defineEventHandler((event) => {
  const idParams = getRouterParam(event, 'id')
  const professional = professionals.find(p => p.id === idParams)

  if (!professional) {
    throw createError({ message: 'Professional not found', statusCode: 404 })
  }

  const { ...rest } = professional
  return rest
})
