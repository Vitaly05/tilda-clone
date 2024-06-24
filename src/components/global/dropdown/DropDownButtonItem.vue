<script>
export default {
  emits: ['click']
}
</script>

<template>
  <button @click.stop="$emit('click')" class="dropdown__button">
    <slot />
  </button>
</template>
