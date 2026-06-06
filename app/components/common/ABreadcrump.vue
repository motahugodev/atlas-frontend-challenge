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
      icon: 'i-heroicons-home', // Ícone opcional (certifique-se de ter o módulo de ícones ativo)
      label: 'Home',
      to: '/'
    }
  ]

  // Monta o caminho incremental para cada pedaço da URL
  let currentPath = ''
  pathArray.forEach((path) => {
    currentPath += `/${path}`

    // Formata o texto (ex: "projetos-ti" vira "Projetos Ti")
    const label = path
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())

    items.push({
      icon: '',
      label,
      to: currentPath
      // Se for o último item, desabilitamos o link (opcional)
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
