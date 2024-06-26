<template>
  <div class="project__pages-list">
    <div v-if="Object.keys(pages).length" class="project__pages-title">Страницы сайта:</div>
    <div v-else class="project__pages-title">Нет ни одной страницы</div>
    <div v-if="pages">
      <PageCard
        v-for="(page, index) in pages"
        :key="index"
        :name="`${page.name}`"
        :description="page.description"
        :address="page.address"
        :id="parseInt(index)"
        :imageSrc="page.imageSrc"
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
  }
}
</script>
