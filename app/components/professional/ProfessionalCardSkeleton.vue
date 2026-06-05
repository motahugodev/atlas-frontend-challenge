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
    <template #footer>
      <USkeleton class="h-6 w-full" />
    </template>
  </UCard>
</template>
