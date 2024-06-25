<template>
  <HeaderApp />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import HeaderApp from '@/components/sections/HeaderApp.vue'

export default {
  components: {
    RouterView,
    HeaderApp
  }
}
</script>
