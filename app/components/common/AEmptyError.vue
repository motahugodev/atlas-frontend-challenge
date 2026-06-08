<script setup lang="ts">
import type { FetchStatus } from '~/types/index'

defineProps<{
  status: FetchStatus
}>()
</script>

<template>
  <UContainer>
    <div
      class="flex justify-center items-center w-full min-h-[300px]"
      role="alert"
      aria-live="polite"
    >
      <UEmpty
        :icon="status === 'error' ? 'i-lucide-alert-triangle' : 'i-lucide-file'"
        :title="status === 'error' ? 'Erro ao carregar dados' : 'Nenhum profissional encontrado'"
        :description="
          status === 'error'
            ? 'Ocorreu um erro ao carregar os profissionais. Por favor, tente novamente mais tarde.'
            : 'Não encontramos nenhum profissional correspondente à sua busca.'
        "
      />
    </div>
  </UContainer>
</template>
