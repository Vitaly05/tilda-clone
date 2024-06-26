<template>
  <div class="image-text-block">
    <img class="image-text-block__image" :src="block?.imageSrc" />
    <EditableText class="image-text-block__text" :block="block" />
  </div>
</template>

<script>
import EditableText from '../block-elements/EditableText.vue'

export default {
  components: {
    EditableText
  },
  props: {
    block: {
      type: Object,
      required: true
    }
  }
}
</script>
