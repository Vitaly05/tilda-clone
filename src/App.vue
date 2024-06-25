<template>
  <HeaderApp />
  <RouterView />
  <BaseModal />
</template>

<script>
import { RouterView } from 'vue-router'
import HeaderApp from '@/components/sections/HeaderApp.vue'
import BaseModal from '@/components/modals/BaseModal.vue'

export default {
  components: {
    RouterView,
    HeaderApp,
    BaseModal
  }
}
</script>
