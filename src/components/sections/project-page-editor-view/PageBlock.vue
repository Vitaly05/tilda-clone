<template>
  <div class="page-block">
    <TextBlock v-if="block.type === 'text'" :block="block" />
    <ImageTextBlock v-if="block.type === 'image-text'" :block="block" />
  </div>
</template>

<script>
import TextBlock from '@/components/sections/project-page-editor-view/block-types/TextBlock.vue'
import ImageTextBlock from '@/components/sections/project-page-editor-view/block-types/ImageTextBlock.vue'

export default {
  components: {
    TextBlock,
    ImageTextBlock
  },
  props: {
    block: {
      type: Object,
      required: true
    }
  }
}
</script>
