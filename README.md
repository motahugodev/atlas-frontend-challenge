# Atlas Frontend Challenge

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&labelColor=020420)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&labelColor=020420)](https://www.typescriptlang.org)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?logo=vitest&labelColor=020420)](https://vitest.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&labelColor=020420)](https://tailwindcss.com)

Plataforma de busca e listagem de profissionais, desenvolvida como frontend challenge. Construída com Nuxt 4 (SSR habilitado), API mock via Nitro server routes e foco em performance e acessibilidade (WCAG).

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Componentes](#componentes)
- [Composables e Store](#composables-e-store)
- [API](#api)
- [Performance](#performance)
- [Testes](#testes)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Comandos](#comandos)
- [Docker](#docker)
- [CI/CD](#cicd)
- [Guia de Contribuição](#guia-de-contribuição)
- [Uso de IA](#uso-de-ia)
- [Autor](#autor)

---

## Funcionalidades

- **Listagem paginada** de 100 profissionais gerados com Faker.js (server-side)
- **Busca com autocomplete** — debounce de 500ms, sincronizada com URL
- **Ordenação** por relevância, preço (crescente/decrescente), avaliação e distância
- **Drawer de preview rápido** — visualização sem sair da listagem
- **Página de detalhes** — galeria de fotos, avaliações, serviços e sidebar de preço
- **Breadcrumb dinâmico** — atualizado conforme a navegação
- **Dark mode** — alternância via Nuxt Color Mode
- **Acessibilidade** — WCAG2A e WCAG2AA validados por Axe-core

---

## Tecnologias

| Tecnologia | Descrição |
|---|---|
| [Nuxt 4](https://nuxt.com) + [Vue 3](https://vuejs.org) | Framework principal com SSR habilitado |
| [TypeScript 6](https://www.typescriptlang.org) | Tipagem estática |
| [Nitro](https://nitro.build) | Server routes para API mock |
| [Pinia](https://pinia.vuejs.org) | Gerenciamento de estado |
| [Nuxt UI](https://ui.nuxt.com) + [TailwindCSS 4](https://tailwindcss.com) | UI e estilização |
| [@nuxt/image](https://image.nuxt.com) | Otimização de imagens via IPX (WebP/AVIF, resize) |
| [@nuxt/fonts](https://fonts.nuxt.com) | Auto-hospedagem de fontes com preload e subsetting |
| [@vueuse/core](https://vueuse.org) | Composables utilitários |
| [Faker.js](https://fakerjs.dev) | Geração de dados mock no servidor |
| [Vitest](https://vitest.dev) + [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing) | Testes unitários e de integração |
| [ESLint](https://eslint.org) + [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) | Qualidade de código |
| [@nuxt/a11y](https://github.com/nuxt-modules/a11y) | Acessibilidade (WCAG2A/2AA via Axe-core) |

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                      Página (Vue / SSR)                  │
│  pages/index.vue           pages/professional/[id].vue  │
└───────────────────┬─────────────────────────────────────┘
                    │ usa
        ┌───────────▼────────────┐
        │      Composables       │
        │  useAutocomplete       │
        │  usePagination         │
        │  useBreadcrumbLabel    │
        └───────────┬────────────┘
                    │ useFetch (SSR)
        ┌───────────▼────────────┐
        │   Nitro Server Routes  │
        │  /api/professionals    │
        │  /api/professionals/   │
        │    autocomplete        │
        │  /api/professionals/   │
        │    :id                 │
        └───────────┬────────────┘
                    │ gerado na inicialização
        ┌───────────▼────────────┐
        │   server/data/         │
        │   professionals.ts     │
        │  (Faker.js, singleton) │
        └────────────────────────┘
```

### Separação de responsabilidades

| Camada | Pasta | Função |
|---|---|---|
| Páginas | `app/pages/` | Orquestração, layout e fetch de dados (SSR) |
| Componentes comuns | `app/components/common/` (prefixo `A`) | UI reutilizável sem acoplamento de domínio |
| Componentes de feature | `app/components/professional/` | UI específica do domínio de profissionais |
| Composables | `app/composables/` | Lógica reativa reutilizável (busca, paginação) |
| Store | `app/stores/` | Estado global compartilhado entre componentes |
| Tipos | `app/types/` | Interfaces TypeScript centralizadas |
| Utils | `app/utils/` | Funções puras sem efeitos colaterais |
| Server routes | `server/api/` | Endpoints Nitro (GET professionals, autocomplete, :id) |
| Server data | `server/data/` | Singleton Faker.js gerado na inicialização do servidor |

---

## Componentes

### Comuns (`app/components/common/`)

| Componente | Responsabilidade | Usado em |
|---|---|---|
| `AAutoComplete.vue` | Modal de busca com command palette | `layouts/default.vue` |
| `ABreadcrump.vue` | Breadcrumb dinâmico (home › nome) | `layouts/default.vue` |
| `ACarouselReview.vue` | Carrossel de avaliações | `ProfessionalReviews.vue` |
| `AEmptyError.vue` | Estado vazio ou mensagem de erro | `pages/index.vue` |
| `AGallery.vue` | Grid de fotos com `NuxtImg` otimizado | `pages/professional/[id].vue` |
| `ARatingCard.vue` | Exibição de nota e estrelas | `ProfessionalCard.vue`, `ProfessionalHeader.vue` |
| `ASortMenu.vue` | Dropdown de ordenação | `pages/index.vue` |

### Profissionais (`app/components/professional/`)

| Componente | Responsabilidade | Usado em |
|---|---|---|
| `ProfessionalCard.vue` | Card da listagem (avatar via UAvatar+NuxtImg, nome, preço) | `ProfessionalList.vue` |
| `ProfessionalCardSkeleton.vue` | Skeleton de carregamento do card | `ProfessionalList.vue` |
| `ProfessionalDetailSkeleton.vue` | Skeleton da página de detalhes | `pages/professional/[id].vue` |
| `ProfessionalHeader.vue` | Cabeçalho com avatar via `NuxtImg` | `pages/professional/[id].vue` |
| `ProfessionalInfo.vue` | Descrição, localização e disponibilidade | `pages/professional/[id].vue` |
| `ProfessionalList.vue` | Container da listagem com slot para paginação | `pages/index.vue` |
| `ProfessionalPreview.vue` | Drawer de preview rápido | `pages/index.vue` |
| `ProfessionalPricing.vue` | Sidebar de preço (sticky) | `pages/professional/[id].vue` |
| `ProfessionalReviews.vue` | Seção de avaliações | `pages/professional/[id].vue` |

---

## Composables e Store

### `useAutocomplete` (`app/composables/useAutocomplete.ts`)

Gerencia a lógica de busca com autocomplete.

- Debounce de **500ms** antes de chamar a API
- Retorna sugestões agrupadas por nome e profissão
- Integra com `useAutocompleteStore` para sincronizar o termo de busca

### `usePagination` (`app/composables/usePagination.ts`)

Controla a paginação da listagem.

- Sincroniza `page`, `limit`, `search` e `sort` como query params na URL
- Fetch via SSR (`useFetch` sem `server: false`)
- Valor padrão: `limit = 12`
- Rola para o topo da página ao navegar entre páginas

### `useBreadcrumbLabel` (`app/composables/useBreadcrumbLabel.ts`)

Compartilha o label dinâmico do breadcrumb entre o layout e a página de detalhes.

- Usa `useState` do Nuxt para estado SSR-safe
- Atualizado pela página `professional/[id].vue` com o nome do profissional

### `useAutocompleteStore` (`app/stores/search.ts`)

Store Pinia com o estado global de busca.

```ts
// Estado
search: string  // Termo de busca atual

// Usado por: AAutoComplete.vue, pages/index.vue
```

---

## API

A API é implementada como **Nitro server routes** em `server/api/`. Os dados são gerados com **Faker.js** uma única vez na inicialização do servidor (`server/data/professionals.ts` — singleton) e mantidos em memória.

### Endpoints

#### `GET /api/professionals`

Lista paginada de profissionais.

| Query param | Tipo | Descrição |
|---|---|---|
| `page` | number | Página atual (padrão: 1) |
| `limit` | number | Itens por página (padrão: 12) |
| `search` | string | Filtro por nome ou profissão |
| `sort` | string | Ordenação: `price_asc`, `price_desc`, `rating_desc`, `distance_asc` |

**Resposta:**
```json
{
  "data": [...],
  "meta": {
    "totalRecords": 100,
    "totalPages": 9,
    "currentPage": 1,
    "limit": 12
  }
}
```

#### `GET /api/professionals/autocomplete`

Sugestões de busca (máximo 7 resultados).

| Query param | Tipo | Descrição |
|---|---|---|
| `query` | string | Termo de busca (case-insensitive) |

#### `GET /api/professionals/:id`

Detalhes completos de um profissional. Retorna `404` se não encontrado.

### Schema do profissional

```ts
interface Professional {
  id: string
  name: string
  profession: string            // 10 categorias disponíveis
  avatar: string
  description: string
  serviceValue: number          // 60–450 BRL, múltiplos de 10
  location: { city: string; state: string }
  distanceKm?: number           // 0.5–20 km (opcional)
  averageRating: number         // 4.0–5.0
  reviews: Review[]
  photoGallery: string[]        // 1–2 imagens
  providedServices: string[]    // 3 serviços
  availability: string[]        // 3–5 dias da semana
}
```

> A variável de ambiente `MOCK_COUNT` controla o número de profissionais gerados (padrão: `100`).

---

## Performance

Esta branch (`performance-improvement`) aplica um conjunto de otimizações baseadas em auditorias do Lighthouse 13.2.

### Migração MirageJS → Nitro Server Routes

O mock de API foi migrado de client-side (MirageJS) para server routes Nitro:

- **Antes**: Faker.js rodava no browser, bloqueando a thread principal; SSR não funcionava pois o interceptor só existia no cliente
- **Depois**: Dados gerados uma vez no servidor (singleton); `useFetch` sem `server: false` entrega dados já no HTML inicial

### SSR com dados no HTML

`useFetch` foi configurado para rodar no SSR (removido `server: false`), eliminando a requisição extra que o browser fazia após o hydration.

### CSS inline (componentes Vue)

`features.inlineStyles: true` injeta os estilos de componentes `.vue` diretamente no `<head>` do HTML, eliminando arquivos CSS externos de componentes.

### Bundle JavaScript

| Otimização | Configuração |
|---|---|
| Split de chunks | `manualChunks` separa `ui`, `vueuse` e `vendor` |
| Target moderno | `vite.build.target: 'esnext'` + `vite.esbuild.target: 'esnext'` |
| Ícones locais | `icon.serverBundle: 'local'` — sem requests à Iconify CDN em runtime |

O `target: 'esnext'` elimina ~50 KiB de polyfills ES6 que o esbuild gerava ao transpilar `reka-ui` (adicionado a `build.transpile` pelo `@nuxt/ui`) com target antigo.

### Fonte Public Sans

| Otimização | Configuração |
|---|---|
| Preload | `fonts.defaults.preload: true` — `<link rel="preload">` emitido no `<head>` |
| Subsetting | `fonts.defaults.subsets: ['latin']` — apenas glifos latinos (~10 KiB vs 26 KiB) |
| Auto-hospedagem | `@nuxt/fonts` baixa e serve a fonte localmente via `/_fonts/` |

O preload quebrou a cadeia de 3 hops (HTML → CSS → `.woff2`) reduzindo a latência de **1,385ms → 332ms**.

### Imagens

| Otimização | Detalhes |
|---|---|
| `NuxtImg` em avatars | `ProfessionalHeader` usa `NuxtImg` diretamente; `ProfessionalCard` e `ProfessionalPreview` passam `width/height` para `UUser` (que roteia via IPX) |
| IPX proxy | Imagens externas (`i.pravatar.cc`, `avatars.githubusercontent.com`) são baixadas, redimensionadas e convertidas para WebP pelo servidor |
| Cache longo | `/_ipx/**` configurado com `cache-control: public, max-age=31536000, immutable` |
| `AGallery` | Usa `NuxtImg` com `sizes` corretas por slot (320px carousel, 44px thumbs) |
| Lazy loading | Imagens fora do viewport com `loading="lazy"` e `decoding="async"` |

### Route Rules (Nitro)

```ts
routeRules: {
  '/':                { prerender: true },           // home pré-renderizada no build
  '/professional/**': { swr: 3600 },                 // detalhe com stale-while-revalidate
  '/_ipx/**':         { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
}
```

---

## Testes

**Framework**: Vitest + @nuxt/test-utils + happy-dom

### Estratégia

| Tipo | Pasta | O que testa |
|---|---|---|
| Unitário | `tests/unit/components/` | Renderização e comportamento de componentes isolados |
| Unitário | `tests/unit/composables/` | Lógica dos composables com mocks de fetch |
| Unitário | `tests/unit/utils/` | Funções puras (ex: formatação de moeda) |
| Integração | `tests/integration/pages/` | Fluxo completo das páginas com navegação |

### Executar testes

```bash
pnpm test             # Execução única
pnpm test:watch       # Modo watch
pnpm test:coverage    # Relatório HTML em coverage/
```

### Padrão dos testes

Componentes são montados com `mountSuspended()` para compatibilidade com composables assíncronos do Nuxt. Mocks são feitos com `vi.mock()` para composables como `useFetch`.

```ts
// Exemplo de teste de componente
const wrapper = await mountSuspended(ProfessionalCard, {
  props: { professional: mockProfessional }
})
expect(wrapper.text()).toContain(mockProfessional.name)
```

---

## Pré-requisitos

- Node.js 22+
- pnpm 11+

---

## Instalação

```bash
pnpm install
```

---

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

---

## Docker

```bash
# Build da imagem
docker build -t atlas-frontend-challenge .

# Executar o container
docker run -p 3000:3000 atlas-frontend-challenge
```

> Build multi-stage: estágio builder (Node 22 Alpine) + estágio runner mínimo. Aplicação exposta na porta `3000`.

---

## CI/CD

Pipeline GitHub Actions executado a cada push com as etapas:

1. **Lint** — verificação de estilo com ESLint
2. **Typecheck** — validação de tipos TypeScript
3. **Test** — execução da suíte de testes
4. **Build** — build de produção
5. **Docker** — build da imagem tagueada com o SHA do commit

---

## Guia de Contribuição

### Fluxo de desenvolvimento

1. Crie uma branch a partir de `main` com o padrão `tipo/descricao` (ex: `feat/add-filter`, `fix/pagination-bug`)
2. Implemente a mudança e escreva os testes correspondentes
3. Rode `pnpm lint:fix` e `pnpm typecheck` antes de commitar
4. O hook de pre-push executa os testes automaticamente via Husky — certifique-se de que passam
5. Abra um Pull Request para `main`

### Padrão de nomenclatura

| Contexto | Padrão | Exemplo |
|---|---|---|
| Componentes comuns | Prefixo `A` | `AAutoComplete.vue` |
| Componentes de feature | Prefixo da feature | `ProfessionalCard.vue` |
| Composables | Prefixo `use` | `useAutocomplete.ts` |
| Stores Pinia | Prefixo `use` + sufixo `Store` | `useAutocompleteStore` |

### Padrão de commits

Mensagens em inglês com prefixo semântico:

```
feat: add distance filter to professionals list
fix: correct pagination reset on search change
refactor: extract rating logic to composable
test: add unit tests for usePagination
docs: update API documentation
perf: migrate mock API from MirageJS to Nitro server routes
```

---

## Estrutura do projeto

```
app/
├── components/
│   ├── common/          # Componentes reutilizáveis (prefixo A)
│   └── professional/    # Componentes da feature de profissionais
├── composables/         # useAutocomplete, usePagination, useBreadcrumbLabel
├── layouts/             # default.vue (header, footer, breadcrumb)
├── pages/               # index.vue, professional/[id].vue
├── stores/              # search.ts (Pinia)
├── types/               # Interfaces TypeScript centralizadas
└── utils/               # Funções puras (ex: formatação de moeda)

server/
├── api/
│   └── professionals/   # index.get.ts, [id].get.ts, autocomplete.get.ts
└── data/
    └── professionals.ts  # Singleton Faker.js (gerado 1x na inicialização)

tests/
├── unit/                # Testes unitários (components, composables, utils)
└── integration/         # Testes de integração (pages)
```

---

## Uso de IA

Este projeto contou com o auxílio do [Claude](https://claude.ai) (Anthropic) para:

- Criação dos testes unitários e de integração
- Criação e atualização de documentação
- Revisão de código (code review)
- Análise e implementação de melhorias de performance (Lighthouse)

---

## Autor

**Hugo Rodrigues Mota**

- Email: [hugo.r.mota12@gmail.com](mailto:hugo.r.mota12@gmail.com)
- GitHub: [github.com/motahugodev](https://github.com/motahugodev)
- LinkedIn: [linkedin.com/in/hugo-mota](https://www.linkedin.com/in/hugo-mota/)
