// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'

export default withNuxt({
  plugins: {
    'vuejs-accessibility': vuejsAccessibility
  },

  rules: {
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'error', // Força componentes com nomes compostos (exceto páginas/layouts do Nuxt)
    'vue/no-unused-components': 'error', // Impede componentes importados e não usados
    'vue/require-default-prop': 'error', // Exige valor padrão para Props não obrigatórias
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always', normal: 'always', component: 'always' }
      }
    ], // Força fechamento tag de forma consistente
    'vue/component-name-in-template-casing': ['error', 'PascalCase'], // Força <MeuComponente /> em vez de <meu-componente />
    'vue/next-tick-style': ['error', 'promise'], // Força uso de async/await com nextTick

    // Accessibility
    'vuejs-accessibility/alt-text': 'error', // Força texto alternativo em imagens
    'vuejs-accessibility/aria-props': 'error', // Valida se os atributos ARIA existem e são válidos
    'vuejs-accessibility/mouse-events-have-key-events': 'error', // Garante que interações de mouse também funcionem via teclado
    'vuejs-accessibility/no-autofocus': 'warn',

    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Proíbe variáveis declaradas e não usadas
    '@typescript-eslint/no-explicit-any': 'error', // Proíbe uso do tipo 'any' (força tipagem real)

    // Environment/Quality
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // Bloqueia console.log em produção
    'no-debugger': 'error', // Bloqueia debugger em qualquer ambiente

    //   // Security & Performance
    'prefer-const': 'error', // Força const sempre que a variável não for reatribuída
    'no-var': 'error', // Bane o uso de 'var' definitivamente
    'eqeqeq': ['error', 'always'] // Força uso de === e !==
  }
},
{
  // Aplica este bloco apenas para arquivos dentro de pages e layouts
  files: [
    'app/pages/**/*.vue',
    'app/layouts/**/*.vue'
    // Caso seu projeto ainda use a estrutura antiga na raiz, descomente as linhas abaixo:
    // 'pages/**/*.vue',
    // 'layouts/**/*.vue'
  ],
  rules: {
    // Desativa completamente a regra de nomes compostos apenas nestes arquivos
    'vue/multi-word-component-names': 'off'
  }
})
