<template>
  <div class="image-text-block">
    <img v-show="block?.imageSrc" class="image-text-block__image" :src="block?.imageSrc" />
    <div v-if="readOnly" class="image-text-block__text">{{ block?.text }}</div>
    <EditableText v-else class="image-text-block__text" :block="block" />
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
    },
    readOnly: Boolean
  }
}
</script>
