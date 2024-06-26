<template>
  <div v-for="(modal, index) in openedModals" class="modal modal--open">
    <div
      class="modal__backdrop"
      :class="{ 'modal__backdrop--first': index === 0 }"
      @click="close"
    ></div>
    <div class="modal__content-wrap">
      <component :is="modal"></component>
    </div>
  </div>
</template>

<script>
import { useModalStore } from '@/stores/modal.js'
import { mapState, mapActions } from 'pinia'

export default {
  computed: {
    ...mapState(useModalStore, ['openedModals'])
  },
  methods: {
    ...mapActions(useModalStore, ['close'])
  }
}
</script>
