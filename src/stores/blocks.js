import { defineStore } from 'pinia'

export const useBlocksStore = defineStore('blocks', {
  state: () => ({
    allBlocks: {
      1: {
        1: {
          nextIndex: 2,
          blocks: [
            {
              id: 1,
              type: 'text',
              text: 'Default text'
            }
          ]
        }
      }
    },
    sideMenuIsOpen: false,
    beforeBlockId: undefined
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
            blocks: []
          }
        }
        return this.allBlocks[projectId][pageId].blocks
      }
    }
  },
  actions: {
    add(projectId, pageId, blockData, beforeBlockId = undefined) {
      const currentBlocks = this.allBlocks[projectId][pageId]
      if (beforeBlockId === undefined) {
        currentBlocks.blocks.push({
          ...JSON.parse(JSON.stringify(blockData)),
          id: currentBlocks.nextIndex++
        })
      } else {
        const index = currentBlocks.blocks.findIndex((block) => block.id === beforeBlockId)
        currentBlocks.blocks.splice(index + 1, 0, {
          ...JSON.parse(JSON.stringify(blockData)),
          id: currentBlocks.nextIndex++
        })
      }
    },
    update(projectId, pageId, blockId, blockData) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = currentBlocks.findIndex((block) => block.id === blockId)
      currentBlocks[currentBlockIndex] = JSON.parse(JSON.stringify(blockData))
    },
    remove(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = currentBlocks.findIndex((block) => block.id === blockId)
      currentBlocks.splice(index, 1)
    },
    duplicate(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId]
      const index = currentBlocks.blocks.findIndex((block) => block.id === blockId)

      currentBlocks.blocks.splice(index + 1, 0, {
        ...JSON.parse(JSON.stringify(currentBlocks.blocks[index])),
        id: currentBlocks.nextIndex++
      })
    },
    moveUp(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = currentBlocks.findIndex((block) => block.id === blockId)
      if (index > 0) {
        ;[currentBlocks[index - 1], currentBlocks[index]] = [
          currentBlocks[index],
          currentBlocks[index - 1]
        ]
      }
    },
    moveDown(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = currentBlocks.findIndex((block) => block.id === blockId)
      if (index < currentBlocks.length - 1) {
        ;[currentBlocks[index + 1], currentBlocks[index]] = [
          currentBlocks[index],
          currentBlocks[index + 1]
        ]
      }
    },
    openSideMenu() {
      this.sideMenuIsOpen = true
    },
    closeSideMenu() {
      this.sideMenuIsOpen = false
    },
    setBeforeBlockId(id) {
      this.beforeBlockId = id
    }
  }
})
