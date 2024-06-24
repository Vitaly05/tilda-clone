<script>
import HeaderPage from '@/components/sections/HeaderPage.vue'

export default {
  components: {
    HeaderPage
  }
}
</script>

<template>
  <HeaderPage />
  <main>Project {{ $route.params.id }}</main>
</template>
