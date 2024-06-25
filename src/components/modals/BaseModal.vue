<template>
  <div class="modal" :class="{ 'modal--open': isOpen }">
    <div class="modal__backdrop" @click="close"></div>
    <div class="modal__content-wrap">
      <component :is="content"></component>
    </div>
  </div>
</template>

<script>
import { useModalStore } from '@/stores/modal.js'
import { mapState, mapActions } from 'pinia'

export default {
  computed: {
    ...mapState(useModalStore, ['isOpen', 'content'])
  },
  methods: {
    ...mapActions(useModalStore, ['close'])
  }
}
</script>
