import { defineStore } from 'pinia'

export const useBlocksStore = defineStore('blocks', {
  state: () => ({
    allBlocks: {
      1: {
        1: {
          nextIndex: 2,
          blocks: {
            1: {
              id: 1,
              type: 'text',
              text: 'Default text'
            }
          }
        }
      }
    },
    sideMenuIsOpen: false
  }),
  getters: {
    getBlocks() {
      return (projectId, pageId) => {
        if (!this.allBlocks[projectId]) {
          this.allBlocks[projectId] = {}
        }
        if (!this.allBlocks[projectId][pageId]) {
          this.allBlocks[projectId][pageId] = {
            nextIndex: 1,
            blocks: {}
          }
        }
        return this.allBlocks[projectId][pageId].blocks
      }
    }
  },
  actions: {
    add(projectId, pageId, blockData) {
      const currentBlocks = this.allBlocks[projectId][pageId]
      currentBlocks.blocks[currentBlocks.nextIndex] = JSON.parse(JSON.stringify(blockData))
      currentBlocks.blocks[currentBlocks.nextIndex].id = currentBlocks.nextIndex
      currentBlocks.nextIndex++
    },
    update(projectId, pageId, blockId, blockData) {
      const currentBlocks = this.allBlocks[projectId][pageId]
      currentBlocks.blocks[blockId] = JSON.parse(JSON.stringify(blockData))
    },
    openSideMenu() {
      this.sideMenuIsOpen = true
    },
    closeSideMenu() {
      this.sideMenuIsOpen = false
    }
  }
})
