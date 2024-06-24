<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <RouterLink class="header__link" :to="url">
    <slot />
  </RouterLink>
</template>
