<template>
  <EditableText :block="block" />
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
