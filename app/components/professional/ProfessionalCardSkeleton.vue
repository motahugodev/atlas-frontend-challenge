<script setup lang="ts">
</script>

<template>
  <UCard class="max-w-sm w-full transition-shadow hover:shadow-md">
    <template #header>
      <div class="flex items-center gap-4">
        <USkeleton class="size-12 rounded-full" />

        <div class="grid gap-2 flex-1">
          <USkeleton class="h-4 max-w-[250px]" />
          <USkeleton class="h-4 max-w-[200px]" />
        </div>
      </div>
    </template>

    <!-- Bloco de Conteúdo Textual -->
    <div class="mt-4 w-full">
      <!-- <div
        class="flex flex-col items-center justify-center"
        :aria-label="`Valor do serviço prestado: ${formatCurrency(professional.serviceValue)}`"
      >
        <span class="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">
          Valor do Serviço
        </span>
        <span
          class="mt-1 text-2xl font-bold text-gray-900 dark:text-white"
          aria-hidden="true"
        >
          {{ formatCurrency(professional.serviceValue) }}
        </span>
      </div> -->
    </div>

    <template #footer>
      <USkeleton class="h-6 w-full" />
    </template>
  </UCard>
</template>
