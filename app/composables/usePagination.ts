import { computed, ref } from 'vue'
import type { PaginatedResponse, UsePaginationOptions } from '~/types/index'

export async function usePagination<T>(url: string, options: UsePaginationOptions = {}) {
  const route = useRoute()
  const router = useRouter()

  const page = ref(options.initialPage || 1)
  const limit = ref(options.initialLimit || 12)
  const isMounted = ref(false) // 👈 Trava para evitar disparos antes da hora
  const search = ref(route.query.search as string | undefined) // 👈 Esse estado vai comandar a busca da grid
  const sort = ref(route.query.sort as string | undefined) // 👈 Estado para ordenação dinâmica

  // 2. O useFetch só vai disparar quando estiver no cliente E com a página correta definida
  const { data: response, error, execute, pending, refresh, status } = await useFetch<PaginatedResponse<T>>(url, {
    immediate: true, // 👈 Bloqueia a execução imediata automática no SSR
    lazy: true,
    query: {
      limit,
      page,
      search,
      sort
    },
    server: false

  })

  // Sincroniza parâmetros na URL
  watch([page, search, sort], ([newPage, newSearch, newSort]) => {
    if (!isMounted.value) {
      return
    }
    const currentQuery = { ...route.query }
    router.push({
      name: 'index',
      query: {
        ...currentQuery,
        page: String(newPage),
        search: newSearch || undefined,
        sort: newSort || undefined
      }
    })
  })

  // 4. Escuta se o usuário usou os botões Avançar/Voltar do navegador
  watch(
    () => route.query,
    (newQuery) => {
      // Sincroniza a página
      const nextPageNum = Number(newQuery.page) || 1
      if (nextPageNum !== page.value) {
        page.value = nextPageNum
      }

      // Sincroniza a busca se ela mudou na URL externamente
      const nextSearch = newQuery.search as string | undefined

      if (nextSearch !== search.value) {
        search.value = nextSearch
        page.value = 1
      }

      // Sincroniza a ordenação se ela mudou na URL externamente
      const nextSort = newQuery.sort as string | undefined
      if (nextSort !== sort.value) {
        sort.value = nextSort
        page.value = 1
      }
    },
    { deep: true }
  )

  // 1. Quando o componente monta no navegador, pegamos o valor REAL da URL
  onMounted(() => {
    if (route.query.page) {
      page.value = Number(route.query.page)
    }
    // Garante que o searchQuery pegue o valor correto do SSR/Client-hydration
    if (route.query.search) {
      search.value = route.query.search as string
    }
    if (route.query.sort) {
      sort.value = route.query.sort as string
    }

    isMounted.value = true
  })

  // Atalhos computados para facilitar o uso no template
  const items = computed(() => response.value?.data || [])
  const meta = computed(() => response.value?.meta || { currentPage: 1, limit: limit.value, totalPages: 1, totalRecords: 0 })

  const hasNext = computed(() => page.value < meta.value.totalPages)
  const hasPrev = computed(() => page.value > 1)

  // Métodos de navegação com travas de segurança
  const nextPage = () => {
    if (hasNext.value) {
      page.value++
      scrollToTop()
    }
  }

  const prevPage = () => {
    if (hasPrev.value) {
      page.value--
      scrollToTop()
    }
  }

  const setPage = (targetPage: number) => {
    if (targetPage >= 1 && targetPage <= meta.value.totalPages) {
      page.value = targetPage
      scrollToTop()
    }
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    }
  }

  return {
    error,
    execute,
    hasNext,
    hasPrev,
    items,
    limit,
    meta,
    nextPage,
    page,
    pending,
    prevPage,
    refresh,
    search,
    setPage,
    sort,
    status
  }
}
