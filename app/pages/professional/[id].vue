<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Professional } from '~/types/index'

const route = useRoute()

const id = computed(() => route.params.id)

const { data: professional, error, status } = await useFetch<Professional>(
  () => `/api/professionals/${id.value}`,
  {
    key: `professional-${route.params.id}`,
    server: false
  }
)

const breadcrumbLabel = useBreadcrumbLabel()

watch(professional, (val) => {
  breadcrumbLabel.value = val?.name ?? null
}, { immediate: true })

onUnmounted(() => {
  breadcrumbLabel.value = null
})
</script>

<template>
  <NuxtLayout name="default">
    <UPage>
      <UContainer v-if="status === 'pending'">
        <ProfessionalDetailSkeleton />
      </UContainer>
      <AEmptyError
        v-else-if="error"
        :status="status"
      />
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
