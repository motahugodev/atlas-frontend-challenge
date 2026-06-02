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
    // Exibe os relatórios diretamente no console do navegador (DevTools)
    verbose: true,

    // Define quais regras do Axe-core você quer validar
    // 'wcag2a' e 'wcag2aa' cobrem os padrões internacionais exigidos por lei
    axeOptions: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'best-practice']
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        printWidth: 100
      }
    }
    // checker: true
  }
})
