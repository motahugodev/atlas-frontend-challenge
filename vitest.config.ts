import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    hookTimeout: 60000,
    testTimeout: 30000,
    environmentOptions: {
      nuxt: {
        rootDir: '.'
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['app/**/*.{ts,vue}'],
      exclude: ['app/plugins/**', 'app/server/**']
    }
  }
})
