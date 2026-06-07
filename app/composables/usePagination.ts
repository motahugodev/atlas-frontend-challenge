import { computed, onMounted, ref, watch } from 'vue'
import type { PaginatedResponse, PaginationMeta, PaginationState, ProfessionalCard, UsePaginationOptions } from '~/types/index'
import { useRoute, useRouter } from 'vue-router'

export async function usePagination<T extends ProfessionalCard>(url: string, options: UsePaginationOptions = {}): Promise<PaginationState> {
  const route = useRoute()
  const router = useRouter()

  const page = ref<number>(options.initialPage || 1)
  const limit = ref<number>(options.initialLimit || 12)
  const isMounted = ref<boolean>(false) //
  const search = ref<string | undefined>(route.query.search as string | undefined)
  const sort = ref<string | undefined>(route.query.sort as string | undefined)

  const { data: response, refresh, status } = await useFetch<PaginatedResponse<T>>(url, {
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

  const items = computed<ProfessionalCard[]>(() => response.value?.data || [])
  const meta = computed<PaginationMeta>(() => response.value?.meta || { currentPage: 1, limit: limit.value, totalPages: 1, totalRecords: 0 })

  const hasNext = computed<boolean>(() => page.value < meta.value.totalPages)
  const hasPrev = computed<boolean>(() => page.value > 1)

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
    hasNext,
    hasPrev,
    items,
    limit,
    meta,
    nextPage,
    page,
    prevPage,
    refresh,
    search,
    setPage,
    sort,
    status
  }
}
