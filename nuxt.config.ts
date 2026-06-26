// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/a11y',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-seo-utils',
    '@nuxt/fonts'
  ],
  ssr: true,

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

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://avatars.githubusercontent.com' },
        { rel: 'dns-prefetch', href: 'https://loremflickr.com' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/professional/**': { swr: 3600 },
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  },

  features: {
    inlineStyles: true
  },

  compatibilityDate: '2025-01-15',

  vite: {
    esbuild: {
      target: 'esnext'
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('@nuxt/ui') || id.includes('reka-ui')) {
              return 'ui'
            }
            else if (id.includes('@vueuse')) {
              return 'vueuse'
            }
            else if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    }
  },

  a11y: {
    enabled: true,
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

  fonts: {
    defaults: {
      preload: true,
      subsets: ['latin']
    }
  },

  icon: {
    serverBundle: 'local',
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
      includeCustomCollections: true,
      icons: [
        'lucide:arrow-left',
        'lucide:arrow-right',
        'lucide:chevron-left',
        'lucide:chevron-right',
        'lucide:chevron-down',
        'lucide:chevron-up',
        'lucide:x',
        'lucide:check',
        'lucide:circle-check',
        'lucide:info',
        'lucide:triangle-alert'
      ]
    }
  },

  image: {
    domains: ['i.pravatar.cc', 'picsum.photos', 'avatars.githubusercontent.com'],
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024
    }
  }
})
