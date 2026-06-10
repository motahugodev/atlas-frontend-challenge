import { makeServer } from '~/server/api/mirage'

export default defineNuxtPlugin(() => {
  if (import.meta.dev || import.meta.client) {
    makeServer({ environment: 'development' })
    // eslint-disable-next-line no-console
    console.log('✨ [MirageJS] Type-safe mock server running on client-side intercepts for /api')
  }
})
