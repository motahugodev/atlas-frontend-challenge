// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'
import perfectionist from 'eslint-plugin-perfectionist'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default withNuxt(
  // ─── Bloco 1a: Vue — parser e regras exclusivos de .vue ─────────────────────
  {
    files: ['**/*.vue'],
    plugins: {
      'vuejs-accessibility': vuejsAccessibility,
    },

    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },

    rules: {
      // ── Vue: Estrutura de arquivo ──────────────────────────────────────────
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/padding-line-between-blocks': 'error',
      'vue/no-empty-component-block': 'error',

      // ── Vue: Script Setup & Macros ─────────────────────────────────────────
      'vue/define-macros-order': ['error', {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      }],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/require-explicit-emits': 'error',
      'vue/no-setup-props-reactivity-loss': 'error',
      'vue/no-required-prop-with-default': 'error',
      'vue/require-typed-ref': 'error',
      'vue/prefer-define-options': 'error',

      // ── Vue: Nomenclatura ──────────────────────────────────────────────────
      'vue/multi-word-component-names': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],

      // ── Vue: Template — Boas práticas ──────────────────────────────────────
      'vue/no-v-html': 'off',
      'vue/no-unused-components': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-ref-as-operand': 'error',
      'vue/no-boolean-default': ['error', 'default-false'],
      'vue/no-lone-template': 'error',
      'vue/no-multiple-slot-args': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/require-default-prop': 'error',

      // ── Vue: Template — Estilo & Shorthands ───────────────────────────────
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      }],
      'vue/v-bind-style': 'error',
      'vue/v-on-style': 'error',
      'vue/v-slot-style': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/html-self-closing': ['error', {
        html: { void: 'always', normal: 'always', component: 'always' },
      }],
      'vue/html-quotes': ['error', 'double'],
      'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      'vue/next-tick-style': ['error', 'promise'],
      'vue/comma-dangle': ['error', 'never'],

      // ── Acessibilidade ─────────────────────────────────────────────────────
      'vuejs-accessibility/alt-text': 'error',
      'vuejs-accessibility/aria-props': 'error',
      'vuejs-accessibility/mouse-events-have-key-events': 'error',
      'vuejs-accessibility/click-events-have-key-events': 'error',
      'vuejs-accessibility/form-control-has-label': 'error',
      'vuejs-accessibility/heading-has-content': 'error',
      'vuejs-accessibility/interactive-supports-focus': 'error',
      'vuejs-accessibility/no-redundant-roles': 'error',
      'vuejs-accessibility/role-has-required-aria-props': 'error',
      'vuejs-accessibility/tabindex-no-positive': 'error',
      'vuejs-accessibility/anchor-has-content': 'error',
      'vuejs-accessibility/label-has-for': 'error',
      'vuejs-accessibility/no-autofocus': 'warn',
    },
  },

  // ─── Bloco 1b: Parser TypeScript para arquivos .ts puros ────────────────────
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },

  // ─── Bloco 1c: Qualidade de código — .ts e .vue ──────────────────────────────
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      // ── Qualidade de código ────────────────────────────────────────────────
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-throw-literal': 'error',
      'no-return-assign': 'error',
      'no-shadow': 'off',
      'no-useless-rename': 'error',
      'curly': ['error', 'all'],
      'dot-notation': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],

      // ── Estilo / Formatação ────────────────────────────────────────────────
      '@stylistic/comma-dangle': ['error', 'never'],
    },
  },

  // ─── Bloco 2: TypeScript — escopo apenas em .ts e .vue ──────────────────────
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
    },
  },

  // ─── Bloco 3: Perfectionist — ordenação de imports/exports/interfaces ────────
  {
    files: ['**/*.ts', '**/*.vue'],
    plugins: { perfectionist },
    rules: {
      // Ordena os itens dentro de um import: import { b, a } → import { a, b }
      'perfectionist/sort-named-imports': ['error', {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      }],

      // Ordena as propriedades de interfaces e types TypeScript
      'perfectionist/sort-interfaces': ['error', {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
      }],

      'perfectionist/sort-objects': ['error', {
        type: 'natural',
        order: 'asc',
        ignoreCase: true,
      }],

      'perfectionist/sort-exports': ['error', {
        type: 'natural',
        order: 'asc',
        ignoreCase: true,
      }],

      'perfectionist/sort-named-exports': ['error', {
        type: 'natural',
        order: 'asc',
        ignoreCase: true,
      }],
    },
  },

  // ─── Bloco 5: Páginas e Layouts — sem multi-word obrigatório ────────────────
  {
    files: [
      'app/pages/**/*.vue',
      'app/layouts/**/*.vue',
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  // ─── Bloco 6: Composables — inferência de tipo suficiente ───────────────────
  {
    files: ['app/composables/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // ─── Bloco 8: Arquivos de configuração — sort-objects desativado ─────────────
  // Objetos de config têm ordem semântica intencional (ex: modules antes de css)
  {
    files: ['nuxt.config.ts', '*.config.ts', '*.config.js', 'app/server/api/mirage.ts'],
    rules: {
      'perfectionist/sort-objects': 'off',
    },
  },
)
