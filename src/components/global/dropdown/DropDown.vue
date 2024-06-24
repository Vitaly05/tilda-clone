<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle']
}
</script>

<template>
  <div class="dropdown">
    <button @click.stop="$emit('toggle')" class="dropdown__toggle">
      <slot />
    </button>
    <div class="dropdown__items" :class="{ 'dropdown__items--show': show }">
      <slot name="items" />
    </div>
  </div>
</template>
