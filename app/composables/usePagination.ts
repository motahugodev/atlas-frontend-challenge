import { computed, ref, watch } from 'vue'
import type { PaginatedResponse, PaginationMeta, PaginationState, ProfessionalCard, UsePaginationOptions } from '~/types/index'
import { useRoute, useRouter } from 'vue-router'

export async function usePagination<T extends ProfessionalCard>(url: string, options: UsePaginationOptions = {}): Promise<PaginationState> {
  const route = useRoute()
  const router = useRouter()

  const page = ref<number>(Number(route.query.page) || options.initialPage || 1)
  const limit = ref<number>(options.initialLimit || 12)
  const search = ref<string | undefined>(route.query.search as string | undefined)
  const sort = ref<string | undefined>(route.query.sort as string | undefined)

  const { data: response, refresh, status } = await useFetch<PaginatedResponse<T>>(url, {
    query: {
      limit,
      page,
      search,
      sort
    }
  })

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    }
  }

  watch(page, () => scrollToTop())

  // Sincroniza parâmetros na URL
  watch([page, search, sort], ([newPage, newSearch, newSort]) => {
    router.replace({
      query: {
        ...route.query,
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
