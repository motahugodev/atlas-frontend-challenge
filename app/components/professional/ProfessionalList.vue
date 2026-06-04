<template>
  <section>
    <ul
      v-if="status === 'pending' || status === 'idle' || professionals.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      aria-label="Lista de profissionais"
    >
      <template v-if="status === 'pending' || status === 'idle'">
        <li
          v-for="index in 8"
          :key="`skeleton-professional-${index}`"
        >
          <ProfessionalCardSkeleton />
        </li>
      </template>

      <template v-else>
        <li
          v-for="professional in professionals"
          :key="professional.id"
        >
          <ProfessionalCard :professional="professional" />
        </li>
      </template>
    </ul>
    <div
      v-else
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
    <div
      v-if="$slots.footer"
      class="flex justify-center my-8"
    >
      <slot name="footer" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProfessionalCard, FetchStatus } from '~/types/index'

defineProps<{
  professionals: ProfessionalCard[]
  status: FetchStatus
}>()
</script>

<style scoped></style>
