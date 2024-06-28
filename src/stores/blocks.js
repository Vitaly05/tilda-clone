import { defaultBlocks } from '@/data/defaultBlocks'
import { getObjectFromLocalStorage, setObjectToLocalStorage } from '@/helpers/localStorage'
import { defineStore } from 'pinia'

function saveBlocks(blocks) {
  setObjectToLocalStorage('allBlocks', blocks)
}

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function replaceBlocks(blocks, index1, index2) {
  ;[blocks[index1], blocks[index2]] = [blocks[index2], blocks[index1]]
}

function findBlockIndexById(blocks, blockId) {
  return blocks.findIndex((block) => block.id === blockId)
}

let storedBlocks = getObjectFromLocalStorage('allBlocks')
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
          ...cloneObject(blockData),
          id: currentBlocks.nextIndex++
        })
      } else {
        const index = findBlockIndexById(currentBlocks.blocks, beforeBlockId)
        currentBlocks.blocks.splice(index + 1, 0, {
          ...cloneObject(blockData),
          id: currentBlocks.nextIndex++
        })
      }
      saveBlocks(this.allBlocks)
    },
    update(projectId, pageId, blockId, blockData) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = findBlockIndexById(currentBlocks, blockId)
      currentBlocks[currentBlockIndex] = cloneObject(blockData)
      saveBlocks(this.allBlocks)
    },
    updateText(projectId, pageId, blockId, newText) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = findBlockIndexById(currentBlocks, blockId)
      currentBlocks[currentBlockIndex].text = newText
      saveBlocks(this.allBlocks)
    },
    updateImage(projectId, pageId, blockId, newSrc) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = findBlockIndexById(currentBlocks, blockId)
      currentBlocks[currentBlockIndex].imageSrc = newSrc
      saveBlocks(this.allBlocks)
    },
    updateImageSlider(projectId, pageId, blockId, imageIndex, newSrc) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = findBlockIndexById(currentBlocks, blockId)
      currentBlocks[currentBlockIndex].slideImages[imageIndex].src = newSrc
      saveBlocks(this.allBlocks)
    },
    remove(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = findBlockIndexById(currentBlocks, blockId)
      currentBlocks.splice(index, 1)
      saveBlocks(this.allBlocks)
    },
    duplicate(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId]
      const index = findBlockIndexById(currentBlocks.blocks, blockId)

      currentBlocks.blocks.splice(index + 1, 0, {
        ...cloneObject(currentBlocks.blocks[index]),
        id: currentBlocks.nextIndex++
      })
      saveBlocks(this.allBlocks)
    },
    moveUp(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = findBlockIndexById(currentBlocks, blockId)
      if (index > 0) {
        replaceBlocks(currentBlocks, index - 1, index)
      }
      saveBlocks(this.allBlocks)
    },
    moveDown(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = findBlockIndexById(currentBlocks, blockId)
      if (index < currentBlocks.length - 1) {
        replaceBlocks(currentBlocks, index + 1, index)
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
