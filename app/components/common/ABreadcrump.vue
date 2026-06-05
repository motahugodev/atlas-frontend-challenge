<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Mapeia as rotas dinamicamente
const breadcrumbItems = computed(() => {
  // Remove barras extras e divide a rota por '/'
  const pathArray = route.path.split('/').filter(path => path)

  // Define o link inicial (Home)
  const items = [
    {
      label: 'Home',
      to: '/',
      icon: 'i-heroicons-home' // Ícone opcional (certifique-se de ter o módulo de ícones ativo)
    }
  ]

  // Monta o caminho incremental para cada pedaço da URL
  let currentPath = ''
  pathArray.forEach((path, index) => {
    currentPath += `/${path}`

    // Formata o texto (ex: "projetos-ti" vira "Projetos Ti")
    const label = path
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())

    items.push({
      label,
      to: currentPath,
      // Se for o último item, desabilitamos o link (opcional)
      disabled: index === pathArray.length - 1
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
