<template>
  <div v-if="readOnly" class="page-block__text">{{ block?.text }}</div>
  <EditableText v-else :block="block" />
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
