<template>
  <div class="animate-pulse space-y-6">
    <div class="flex items-start gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
      <USkeleton class="h-24 w-24 rounded-full flex-shrink-0" />

      <div class="space-y-3 flex-1 pt-2">
        <USkeleton class="h-4 w-24 rounded" />
        <USkeleton class="h-8 w-64 rounded" />
        <USkeleton class="h-5 w-48 rounded" />

        <div class="flex gap-2 pt-2">
          <USkeleton class="h-6 w-20 rounded-full" />
          <USkeleton class="h-6 w-24 rounded-full" />
          <USkeleton class="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>

    <div class="flex md:flex-row flex-col-reverse justify-center items-start gap-6">
      <div class="flex-1 w-full space-y-4">
        <USkeleton class="h-28 w-full rounded-xl" />

        <USkeleton class="h-36 w-full rounded-xl" />

        <div class="flex flex-col gap-4 md:flex-row">
          <USkeleton class="h-32 w-full md:w-48 rounded-xl" />
          <USkeleton class="h-32 flex-1 rounded-xl" />
        </div>

        <div class="space-y-2">
          <USkeleton class="h-6 w-32 rounded" />
          <div class="grid grid-cols-3 gap-2">
            <USkeleton class="h-24 rounded-lg" />
            <USkeleton class="h-24 rounded-lg" />
            <USkeleton class="h-24 rounded-lg" />
          </div>
        </div>
      </div>

      <div class="w-full md:max-w-xs flex-shrink-0">
        <USkeleton class="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  </div>
</template>
