import { makeServer } from '../utils/mirage'

export default defineNuxtPlugin(() => {
  if (import.meta.dev) {
    makeServer({ environment: 'development' })
    console.log('✨ [MirageJS] Type-safe mock server running on client-side intercepts for /api')
  }
})
