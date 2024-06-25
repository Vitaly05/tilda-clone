<template>
  <div class="project__pages-list">
    <div v-if="pages?.length !== 0" class="project__pages-title">Страницы сайта:</div>
    <div v-else class="project__pages-title">Нет ни одной страницы</div>
    <div v-if="pages">
      <PageCard
        v-for="(page, index) in pages"
        :key="index"
        :name="`${page.name}`"
        :id="parseInt(index)"
        :imageSrc="page.imageSrc"
        @remove="(id) => $emit('remove', id)"
      />
    </div>
  </div>
</template>

<script>
import PageCard from '@/components/sections/project-view/pages-list/PageCard.vue'

export default {
  components: {
    PageCard
  },
  props: {
    pages: {
      type: Object,
      required: true
    }
  },
  emits: ['remove']
}
</script>
