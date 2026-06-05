<template>
  <NuxtLayout name="default">
    <UPage>
      <UContainer v-if="status === 'pending'">
        <ProfessionalDetailSkeleton />
      </UContainer>
      <ProfessionalError v-else-if="error" />
      <UContainer v-else-if="status === 'success' && !!professional">
        <ProfessionalHeader :professional="professional" />
        <div class="flex md:flex-row flex-col-reverse justify-center gap-6">
          <div class="flex-1 space-y-4">
            <ProfessionalInfo :professional="professional" />
            <ProfessionalReviews :professional="professional" />
            <AGallery :items="professional.photoGallery" />
          </div>
          <ProfessionalPricing :professional="professional" />
        </div>
      </UContainer>
    </UPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Professional } from '~/types/index'

const route = useRoute()

const id = computed(() => route.params.id)

const { data: professional, status, error } = await useFetch<Professional>(
  () => `/api/professionals/${id.value}`,
  {
    server: false,
    key: `professional-${route.params.id}`
  }
)
</script>
