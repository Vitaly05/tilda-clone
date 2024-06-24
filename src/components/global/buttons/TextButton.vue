<script>
export default {
  props: {
    textColor: {
      type: String,
      required: false,
      validator(value, props) {
        return ['primary', 'secondary'].includes(value)
      },
      default() {
        return 'primary'
      }
    }
  },
  emits: ['click'],
  computed: {
    buttonClass() {
      return `button--${this.textColor}`
    }
  }
}
</script>

<template>
  <button @click="$emit('click')" class="button" :class="buttonClass">
    <slot />
  </button>
</template>
