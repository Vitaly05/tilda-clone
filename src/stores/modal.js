import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    selectedImageSrc: '',
    openedModals: []
  }),
  actions: {
    open(content) {
      this.openedModals.push(content)
    },
    close() {
      this.openedModals.pop()
    },
    setSelectedImageSrc(src) {
      this.selectedImageSrc = src
    }
  }
})
