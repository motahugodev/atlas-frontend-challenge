// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/a11y'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
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
    },
    checker: true
  }
})
