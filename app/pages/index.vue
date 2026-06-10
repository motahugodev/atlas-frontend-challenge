<script setup lang="ts">
import type { ProfessionalCard } from '~/types/index'
import { useAutocompleteStore } from '~/stores/search'

const store = useAutocompleteStore()

const {
  items: professionals,
  meta,
  page,
  search,
  sort,
  status
} = await usePagination<ProfessionalCard>('/api/professionals', { initialLimit: 12 })

watch(() => store.search, (name: string) => {
  search.value = name
  page.value = 1
})
</script>

<template>
  <NuxtLayout name="default">
    <UPageHero
      title="Encontre seu profissional"
      description="Soluções estratégicas, excelência técnica e dedicação para fazer o seu projeto ir mais longe."
    />
    <UContainer>
      <ASortMenu
        v-model:sort="sort"
        :current-page="meta.currentPage"
        :total-pages="meta.totalPages"
        class="mb-6"
      />
      <ProfessionalList
        :professionals="professionals"
        :status="status"
      >
        <template #footer>
          <UPagination
            v-if="meta.totalPages > 0"
            v-model:page="page"
            :total="meta.totalRecords"
            :items-per-page="meta.limit"
            :size="'lg'"
            :aria-label="'Navegação de páginas'"
          />
        </template>
      </ProfessionalList>
    </UContainer>
  </NuxtLayout>
</template>
