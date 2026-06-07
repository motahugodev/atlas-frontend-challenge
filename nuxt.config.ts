// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // Required for Mirage to intercept initial lifecycle hooks

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/a11y', '@nuxt/image', '@pinia/nuxt'],
  plugins: [
    { src: '~/plugins/mirage.client.ts', mode: 'client' }
  ],
  ssr: false,
  components: [
    {
      path: '~/components/common',
      pathPrefix: false
    },

    '~/components'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/professional/**': { swr: 3600 }
  },

  compatibilityDate: '2025-01-15',
  a11y: {
    enabled: true,

    // Define quais regras do Axe-core você quer validar
    // 'wcag2a' e 'wcag2aa' cobrem os padrões internacionais exigidos por lei
    axe: {
      options: {},
      runOptions: {
        runOnly: ['wcag2a', 'wcag2aa']
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
        indent: 2
      }
    }
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512
    }
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024
    }
  }
})
