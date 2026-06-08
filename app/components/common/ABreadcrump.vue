<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbLabel = useBreadcrumbLabel()

const routeParamValues = computed(() => Object.values(route.params).map(String))

// Mapeia as rotas dinamicamente
const breadcrumbItems = computed(() => {
  // Remove barras extras e divide a rota por '/'
  const pathArray = route.path.split('/').filter(path => path)

  // Define o link inicial (Home)
  const items = [
    {
      icon: 'i-heroicons-home',
      label: 'Página Inicial',
      to: '/'
    }
  ]

  // Monta o caminho incremental para cada pedaço da URL
  let currentPath = ''
  pathArray.forEach((path) => {
    currentPath += `/${path}`

    const isDynamicParam = routeParamValues.value.includes(path)
    const label = isDynamicParam && breadcrumbLabel.value
      ? breadcrumbLabel.value
      : path.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())

    items.push({
      icon: '',
      label,
      to: currentPath
    })
  })

  return items
})
</script>

<template>
  <UBreadcrumb
    :items="breadcrumbItems"
    class="my-4"
  />
</template>
