import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    // TODO: type, remove content
    content: undefined
  }),
  actions: {
    open(content) {
      this.content = content
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  }
})
