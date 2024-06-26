import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    // TODO: type, remove content
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
