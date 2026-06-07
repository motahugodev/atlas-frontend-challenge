<script setup lang="ts">
defineProps<{
  // Permite passar uma opção inicial selecionada
  items?: string[]
}>()

const carousel = useTemplateRef('carousel')
const activeIndex = ref<number>(0)

function onClickNext() {
  activeIndex.value++
}
function onClickPrev() {
  activeIndex.value--
}
function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}
</script>

<template>
  <UPageCard
    title="Galeria de Fotos"
    icon="i-heroicons-photo-solid"
    variant="soft"
  >
    <div class="flex-1 w-full">
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        arrows
        :items="items"
        :prev="{ onClick: onClickPrev }"
        :next="{ onClick: onClickNext }"
        class="w-full max-w-xs mx-auto"
        @select="onSelect"
      >
        <NuxtImg
          :src="item"
          alt="Foto do profissional"
          width="320"
          height="320"
          class="rounded-lg"
          format="webp"
          fetchpriority="high"
          sizes="(max-width: 320px) 100vw, 1200px"
        />
      </UCarousel>

      <div class="flex gap-1 justify-between pt-4 max-w-xs mx-auto">
        <button
          v-for="(item, index) in items"
          :key="index"
          type="button"
          class="size-11 opacity-25 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          :class="{ 'opacity-100': activeIndex === index }"
          :aria-label="`Ver foto ${index + 1}`"
          :aria-pressed="activeIndex === index"
          @click="select(index)"
        >
          <NuxtImg
            :src="item"
            width="44"
            height="44"
            class="rounded-lg"
            loading="lazy"
            format="webp"
            sizes="(max-width: 68px) 100vw, 1200px"
            :alt="`Miniatura da foto ${index + 1}`"
          />
        </button>
      </div>
    </div>
  </UPageCard>
</template>
