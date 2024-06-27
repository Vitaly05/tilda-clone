import { getObject, setObject } from '@/helpers/localStorage'
import { defineStore } from 'pinia'

const defaultBlocks = {
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
}

let storedBlocks = getObject('allBlocks')
if (!storedBlocks) {
  storedBlocks = defaultBlocks
  saveBlocks(defaultBlocks)
}

export const useBlocksStore = defineStore('blocks', {
  state: () => ({
    allBlocks: storedBlocks,
    sideMenuIsOpen: false,
    beforeBlockId: undefined,
    currentId: undefined
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
    },
    getCurrentBlock() {
      return (projectId, pageId) => {
        if (this.currentId !== undefined) {
          return this.allBlocks[projectId][pageId].blocks.find(
            (block) => block.id === this.currentId
          )
        }
        return undefined
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
      saveBlocks(this.allBlocks)
    },
    update(projectId, pageId, blockId, blockData) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = currentBlocks.findIndex((block) => block.id === blockId)
      currentBlocks[currentBlockIndex] = JSON.parse(JSON.stringify(blockData))
      saveBlocks(this.allBlocks)
    },
    updateText(projectId, pageId, blockId, newText) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = currentBlocks.findIndex((block) => block.id === blockId)
      currentBlocks[currentBlockIndex].text = newText
      saveBlocks(this.allBlocks)
    },
    updateImage(projectId, pageId, blockId, newSrc) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = currentBlocks.findIndex((block) => block.id === blockId)
      currentBlocks[currentBlockIndex].imageSrc = newSrc
      saveBlocks(this.allBlocks)
    },
    remove(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = currentBlocks.findIndex((block) => block.id === blockId)
      currentBlocks.splice(index, 1)
      saveBlocks(this.allBlocks)
    },
    duplicate(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId]
      const index = currentBlocks.blocks.findIndex((block) => block.id === blockId)

      currentBlocks.blocks.splice(index + 1, 0, {
        ...JSON.parse(JSON.stringify(currentBlocks.blocks[index])),
        id: currentBlocks.nextIndex++
      })
      saveBlocks(this.allBlocks)
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
      saveBlocks(this.allBlocks)
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
      saveBlocks(this.allBlocks)
    },
    openSideMenu() {
      this.sideMenuIsOpen = true
    },
    closeSideMenu() {
      this.sideMenuIsOpen = false
    },
    setBeforeBlockId(id) {
      this.beforeBlockId = id
    },
    setCurrentId(id) {
      this.currentId = id
    }
  }
})

function saveBlocks(blocks) {
  setObject('allBlocks', blocks)
}
