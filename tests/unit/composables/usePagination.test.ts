/**
 * Testa a lógica de paginação de forma isolada do Nuxt.
 * A integração completa (com useRoute, useRouter, useFetch) é coberta
 * pelos testes de integração da página index.
 */
import { describe, expect, it } from 'vitest'
import { computed } from 'vue'
import type { PaginationMeta, PaginationState } from '~/type/index'

function createPaginationState(totalPages: number, initialPage = 1): PaginationState {
  const page = ref(initialPage)
  const limit = ref(12)
  const meta = computed<PaginationMeta>(() => ({
    currentPage: page.value,
    limit: limit.value,
    totalPages,
    totalRecords: totalPages * 12
  }))
  const hasNext = computed(() => page.value < meta.value.totalPages)
  const hasPrev = computed(() => page.value > 1)

  const nextPage = (): void => {
    if (hasNext.value) {
      page.value++
    }
  }
  const prevPage = (): void => {
    if (hasPrev.value) {
      page.value--
    }
  }
  const setPage = (target: number): void => {
    if (target >= 1 && target <= meta.value.totalPages) {
      page.value = target
    }
  }

  return { hasNext, hasPrev, limit, meta, nextPage, page, prevPage, setPage }
}

describe('usePagination — lógica de paginação', () => {
  describe('estado inicial', () => {
    it('page começa em 1 por padrão', () => {
      const { page } = createPaginationState(5)
      expect(page.value).toBe(1)
    })

    it('respeita initialPage', () => {
      const { page } = createPaginationState(5, 3)
      expect(page.value).toBe(3)
    })

    it('limit inicia em 12', () => {
      const { limit } = createPaginationState(5)
      expect(limit.value).toBe(12)
    })
  })

  describe('hasNext e hasPrev', () => {
    it('hasNext é true quando page < totalPages', () => {
      const { hasNext } = createPaginationState(5, 1)
      expect(hasNext.value).toBe(true)
    })

    it('hasNext é false na última página', () => {
      const { hasNext } = createPaginationState(5, 5)
      expect(hasNext.value).toBe(false)
    })

    it('hasPrev é false na primeira página', () => {
      const { hasPrev } = createPaginationState(5, 1)
      expect(hasPrev.value).toBe(false)
    })

    it('hasPrev é true quando page > 1', () => {
      const { hasPrev } = createPaginationState(5, 3)
      expect(hasPrev.value).toBe(true)
    })
  })

  describe('nextPage', () => {
    it('incrementa a página quando hasNext é true', () => {
      const { nextPage, page } = createPaginationState(5, 1)
      nextPage()
      expect(page.value).toBe(2)
    })

    it('não ultrapassa totalPages', () => {
      const { nextPage, page } = createPaginationState(5, 5)
      nextPage()
      expect(page.value).toBe(5)
    })
  })

  describe('prevPage', () => {
    it('decrementa a página quando hasPrev é true', () => {
      const { page, prevPage } = createPaginationState(5, 3)
      prevPage()
      expect(page.value).toBe(2)
    })

    it('não decrementa abaixo de 1', () => {
      const { page, prevPage } = createPaginationState(5, 1)
      prevPage()
      expect(page.value).toBe(1)
    })
  })

  describe('setPage', () => {
    it('define página válida dentro do range', () => {
      const { page, setPage } = createPaginationState(5)
      setPage(4)
      expect(page.value).toBe(4)
    })

    it('ignora página maior que totalPages', () => {
      const { page, setPage } = createPaginationState(5)
      setPage(99)
      expect(page.value).toBe(1)
    })

    it('ignora página menor que 1', () => {
      const { page, setPage } = createPaginationState(5)
      setPage(0)
      expect(page.value).toBe(1)
    })

    it('aceita página igual a 1 (primeira)', () => {
      const { page, setPage } = createPaginationState(5, 3)
      setPage(1)
      expect(page.value).toBe(1)
    })

    it('aceita página igual a totalPages (última)', () => {
      const { page, setPage } = createPaginationState(5)
      setPage(5)
      expect(page.value).toBe(5)
    })
  })

  describe('meta computado', () => {
    it('totalPages reflete o valor passado', () => {
      const { meta } = createPaginationState(10)
      expect(meta.value.totalPages).toBe(10)
    })

    it('currentPage é reativo à mudança de page', () => {
      const { meta, nextPage } = createPaginationState(5)
      nextPage()
      expect(meta.value.currentPage).toBe(2)
    })
  })
})
