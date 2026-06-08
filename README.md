# Atlas Frontend Challenge

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&labelColor=020420)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&labelColor=020420)](https://www.typescriptlang.org)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?logo=vitest&labelColor=020420)](https://vitest.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&labelColor=020420)](https://tailwindcss.com)

Plataforma de busca e listagem de profissionais, desenvolvida como frontend challenge. SPA construída com Nuxt 4 (SSR desabilitado), com mock de API via MirageJS e foco em acessibilidade (WCAG).


## Tecnologias

| Tecnologia | Descrição |
|---|---|
| [Nuxt 4](https://nuxt.com) + [Vue 3](https://vuejs.org) | Framework principal |
| [TypeScript 6](https://www.typescriptlang.org) | Tipagem estática |
| [Pinia](https://pinia.vuejs.org) | Gerenciamento de estado |
| [Nuxt UI](https://ui.nuxt.com) + [TailwindCSS 4](https://tailwindcss.com) | UI e estilização |
| [@vueuse/core](https://vueuse.org) | Composables utilitários |
| [Vitest](https://vitest.dev) + [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing) | Testes unitários e de integração |
| [MirageJS](https://miragejs.com) | Mock de API no client-side |
| [ESLint](https://eslint.org) + [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) | Qualidade de código |
| [@nuxt/a11y](https://github.com/nuxt-modules/a11y) | Acessibilidade (WCAG2A/2AA via Axe-core) |

## Pré-requisitos

- Node.js 22+
- pnpm 11+

## Instalação

```bash
pnpm install
```

## Comandos

```bash
pnpm dev              # Servidor de desenvolvimento em http://localhost:3000
pnpm build            # Build de produção
pnpm preview          # Preview do build de produção

pnpm test             # Executar testes (vitest run)
pnpm test:watch       # Testes em modo watch
pnpm test:coverage    # Relatório de cobertura (HTML em coverage/)

pnpm lint             # Verificar com ESLint
pnpm lint:fix         # Corrigir automaticamente com ESLint
pnpm typecheck        # Verificação de tipos TypeScript
```

## Docker

```bash
# Build da imagem
docker build -t atlas-frontend-challenge .

# Executar o container
docker run -p 3000:3000 atlas-frontend-challenge
```

> Build multi-stage: estágio builder (Node 22 Alpine) + estágio runner mínimo. Aplicação exposta na porta `3000`.

## Estrutura do projeto

```
app/
├── components/
│   ├── common/          # Componentes reutilizáveis
│   └── professional/    # Componentes da feature de profissionais
├── composables/         # useAutocomplete, usePagination, etc.
├── layouts/             # Layouts de página
├── pages/               # Roteamento (index, professional/[id])
├── plugins/             # mirage.client.ts (mock de API)
├── stores/              # search.ts (Pinia)
├── types/               # Definições de tipos TypeScript
└── utils/               # Funções utilitárias

tests/
├── unit/                # Testes unitários (components, composables, utils)
└── integration/         # Testes de integração (pages)
```

## CI/CD

Pipeline GitHub Actions executado a cada push com as etapas:

1. **Lint** — verificação de estilo com ESLint
2. **Typecheck** — validação de tipos TypeScript
3. **Test** — execução da suíte de testes
4. **Build** — build de produção
5. **Docker** — build da imagem tagueada com o SHA do commit

## Uso de IA

Este projeto contou com o auxílio do [Claude](https://claude.ai) (Anthropic) para:

- Criação dos testes unitários e de integração
- Criação de documentação
- Revisão de código (code review)

## Autor

**Hugo Rodrigues Mota**

- Email: [hugo.r.mota12@gmail.com](mailto:hugo.r.mota12@gmail.com)
- GitHub: [github.com/motahugodev](https://github.com/motahugodev)
- LinkedIn: [linkedin.com/in/hugo-mota](https://www.linkedin.com/in/hugo-mota/)
