import { ref, computed } from 'vue'
import type { PaginatedResponse, UsePaginationOptions } from '~/types/index'

export async function usePagination<T>(url: string, options: UsePaginationOptions = {}) {
  const route = useRoute()
  const router = useRouter()

  const page = ref(options.initialPage || 1)
  const limit = ref(options.initialLimit || 12)
  const isMounted = ref(false) // 👈 Trava para evitar disparos antes da hora
  const searchQuery = ref(route.query.search as string | undefined) // 👈 Esse estado vai comandar a busca da grid

  // 1. Quando o componente monta no navegador, pegamos o valor REAL da URL
  onMounted(() => {
    if (route.query.page) {
      page.value = Number(route.query.page)
    }
    // Garante que o searchQuery pegue o valor correto do SSR/Client-hydration
    if (route.query.search) {
      searchQuery.value = route.query.search as string
    }

    isMounted.value = true
  })

  // 2. O useFetch só vai disparar quando estiver no cliente E com a página correta definida
  const { data: response, pending, error, refresh, status, execute } = await useFetch<PaginatedResponse<T>>(url, {
    server: false,
    immediate: true, // 👈 Bloqueia a execução imediata automática no SSR
    query: {
      page,
      limit,
      search: searchQuery
    }

  })

  // Sincroniza parâmetros na URL
  watch([page, searchQuery], ([newPage, newSearch]) => {
    if (!isMounted.value) return
    const currentQuery = { ...route.query }
    router.push({
      query: {
        ...currentQuery,
        page: String(newPage),
        search: newSearch || undefined
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
      if (nextSearch !== searchQuery.value) {
        searchQuery.value = nextSearch
        if (page.value !== 1) return page.value = 1
      }
    },
    { deep: true }
  )

  // Atalhos computados para facilitar o uso no template
  const items = computed(() => response.value?.data || [])
  const meta = computed(() => response.value?.meta || { totalRecords: 0, totalPages: 1, currentPage: 1, limit: limit.value })

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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return {
    page,
    limit,
    items,
    meta,
    status,
    pending,
    error,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
    setPage,
    refresh,
    execute,
    searchQuery
  }
}
