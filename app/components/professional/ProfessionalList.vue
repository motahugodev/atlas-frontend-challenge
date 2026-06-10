<script setup lang="ts">
import type { FetchStatus, ProfessionalCard } from '~/types/index'

defineProps<{
  professionals: ProfessionalCard[]
  status: FetchStatus
}>()
</script>

<template>
  <section>
    <ul
      v-if="status === 'pending' || status === 'idle' || professionals.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      aria-label="Lista de profissionais"
    >
      <template v-if="status === 'pending' || status === 'idle'">
        <li
          v-for="index in 12"
          :key="`skeleton-professional-${index}`"
        >
          <ProfessionalCardSkeleton />
        </li>
      </template>

      <template v-else>
        <li
          v-for="(professional, index) in professionals"
          :key="professional.id"
        >
          <ProfessionalCard
            :professional="professional"
            :priority="index < 4"
          />
        </li>
      </template>
    </ul>
    <AEmptyError
      v-else
      :status="status"
    />
    <div
      v-if="$slots.footer"
      class="flex justify-center my-8"
    >
      <slot name="footer" />
    </div>
  </section>
</template>
