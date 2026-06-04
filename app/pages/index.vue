<template>
  <NuxtLayout name="default">
    <UPageHero
      title="Nuxt Starter Template"
      description="A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours."
    >
      <template #links>
        <AAutoComplete
          v-model:search="search"
          @select="onProfessionalSelect"
        />
      </template>
    </UPageHero>
    <UContainer>
      <ASortMenu
        v-model:sort="sort"
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
            :total="meta.totalPages"
            :size="'lg'"
            :aria-label="'Navegação de páginas'"
          />
        </template>
      </ProfessionalList>
    </UContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { ProfessionalCard, AutocompleteItem } from '~/types/index'

const {
  items: professionals,
  status,
  page,
  meta,
  search,
  sort
} = await usePagination<ProfessionalCard>('/api/professionals', { initialLimit: 12 })

const onProfessionalSelect = (selected: AutocompleteItem) => {
  // Redireciona usando a função nativa do Nuxt 4 para a rota dinâmica do profissional
  navigateTo(`/professional/${selected.id}`)
}
</script>
