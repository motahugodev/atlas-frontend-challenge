<template>
  <NuxtLayout name="default">
    <UPage>
      <ASortMenu>
        <template #label>
          <AAutoComplete @update:search="onRedirectSearch" />
        </template>
      </ASortMenu>
      <UContainer v-if="status === 'pending'">
        <ProfessionalDetailSkeleton />
      </UContainer>
      <UContainer v-else-if="error">
        <div class="p-8 text-center text-red-500">
          Erro ao carregar o profissional. Tente novamente.
        </div>
      </UContainer>
      <UContainer v-else-if="status === 'success' && !!professional">
        <UPageHeader
          :title="professional.name"
          :description="professional.profession"
          headline="Components"
          class="mb-6"
        >
          <template #headline>
            <UAvatar
              :src="professional.avatar"
              :alt="professional.name"
              size="2xl"
              rounded="full"
            />
          </template>
          <template #links>
            <UBadge
              v-for="service in professional.providedServices"
              :key="service"
            >
              {{ service }}
            </UBadge>
          </template>
        </UPageHeader>

        <div class="flex md:flex-row flex-col-reverse justify-center gap-6">
          <div class="flex-1 space-y-4">
            <UPageCard
              title="Localização"
              :description="professional.location ? `${professional.location.city}, ${professional.location.state}` : 'Não informada'"
              variant="soft"
              icon="i-heroicons-map-pin"
            />
            <UPageCard
              title="Descrição"
              :description="professional.description"
              variant="soft"
              icon="i-heroicons-document-text"
            />
            <div class="flex flex-col gap-4 md:flex-row">
              <ARatingCard
                :rating="professional.serviceValue || 0"
                :total-reviews="professional.reviews?.length || 0"
              />
              <ACarouselReview
                class="flex-1"
                :reviews="professional.reviews"
              />
            </div>
            <AGallery :items="professional.photoGallery" />
          </div>
          <div class="max-w-xs">
            <UPricingPlan
              title="Contrate aqui"
              description="Aproveite agora a melhor oferta"
              :price="formatCurrency(professional.serviceValue)"
              :features="professional.providedServices"
              :button="{ label: 'Contratar' }"
              variant="subtle"
            />
          </div>
        </div>
      </UContainer>
    </UPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Professional } from '~/types/index'
import { formatCurrency } from '~/utils/currency'

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id)

const { data: professional, status, error } = await useFetch<Professional>(
  () => `/api/professionals/${id.value}`,
  {
    server: false,
    key: `professional-${route.params.id}`
  }
)

const onRedirectSearch = (search: string) => {
  router.push({
    name: 'index',
    query: { search }
  })
}
</script>
