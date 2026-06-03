<template>
  <NuxtLayout name="default">
    <div>
      <UPageHero
        title="Nuxt Starter Template"
        description="A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours."
      >
        <template #links>
          <ProfessionalFilters
            @select="onProfessionalSelect"
            @search="onSearch"
          />
        </template>
      </UPageHero>
      <ProfessionalList
        :professionals="professionals"
        :status="status"
      >
        <template #footer>
          <UPagination
            v-if="meta.totalPages > 1"
            v-model:page="page"
            :total="meta.totalPages"
            :size="'lg'"
            :aria-label="'Navegação de páginas'"
          />
        </template>
      </ProfessionalList>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { ProfessionalCard, AutocompleteItem } from '~/types/index'

const {
  items: professionals,
  status,
  page,
  meta,
  searchQuery,
  refresh
} = await usePagination<ProfessionalCard>('/api/professionals', { initialLimit: 12 })

const onProfessionalSelect = (selected: AutocompleteItem) => {
  // Redireciona usando a função nativa do Nuxt 4 para a rota dinâmica do profissional
  navigateTo(`/professionals/${selected.id}`)
}

const onSearch = async (query: string) => {
  searchQuery.value = query
  await refresh()
}
</script>
