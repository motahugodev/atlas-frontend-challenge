<script setup lang="ts">
import { useAutocompleteStore } from '~/stores/search'

const store = useAutocompleteStore()
const router = useRouter()
const isOpen = ref<boolean>(false)

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [{ href: '/favicon.ico', rel: 'icon' }],
  meta: [{ content: 'width=device-width, initial-scale=1', name: 'viewport' }]
})

const title = 'Atlas Service'
const description
  = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  description,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  ogTitle: title,
  title,
  twitterCard: 'summary_large_image'
})

const onSearch = (value: string): void => {
  store.search = value
  isOpen.value = false
  router.push({ name: 'index' })
}
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <h1>Atlas Service</h1>
        </NuxtLink>
      </template>
      <template #right>
        <UModal v-model:open="isOpen">
          <UButton
            label="Buscar"
            variant="ghost"
            icon="i-lucide-search"
          />

          <template #content>
            <AAutoComplete
              :search="store.search"
              @update:open="isOpen = $event"
              @update:search="onSearch"
            />
          </template>
        </UModal>
        <UColorModeButton />
      </template>
    </UHeader>
    <UContainer v-if="$route.name !== 'index'">
      <ABreadcrump />
    </UContainer>
    <UMain>
      <slot />
    </UMain>
    <USeparator icon="i-simple-icons-nuxtdotjs" />
    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Hugo Mota • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/motahugodev/atlas-frontend-challenge"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
