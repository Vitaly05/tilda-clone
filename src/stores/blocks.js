import { getObject, setObject } from '@/helpers/localStorage'
import historyService from '@/helpers/historyService'
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

let history = historyService.getDataHistory()
if (!history.length) {
  historyService.saveDataHistory([storedBlocks])
}

export const useBlocksStore = defineStore('blocks', {
  state: () => ({
    initCountHistory: history.length,
    changeCountHistory: history.length,
    isAddHistory: false,
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
      this.addToHistory(this.allBlocks)
    },
    update(projectId, pageId, blockId, blockData) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = findBlockIndexById(currentBlocks, blockId)
      currentBlocks[currentBlockIndex] = cloneObject(blockData)
      saveBlocks(this.allBlocks)
      this.addToHistory(this.allBlocks)
    },
    updateText(projectId, pageId, blockId, newText) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = findBlockIndexById(currentBlocks, blockId)
      currentBlocks[currentBlockIndex].text = newText
      saveBlocks(this.allBlocks)
      this.addToHistory(this.allBlocks)
    },
    updateImage(projectId, pageId, blockId, newSrc) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = findBlockIndexById(currentBlocks, blockId)
      currentBlocks[currentBlockIndex].imageSrc = newSrc
      saveBlocks(this.allBlocks)
      this.addToHistory(this.allBlocks)
    },
    updateImageSlider(projectId, pageId, blockId, imageIndex, newSrc) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const currentBlockIndex = findBlockIndexById(currentBlocks, blockId)
      currentBlocks[currentBlockIndex].slideImages[imageIndex].src = newSrc
      saveBlocks(this.allBlocks)
      this.addToHistory(this.allBlocks)
    },
    remove(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = findBlockIndexById(currentBlocks, blockId)
      currentBlocks.splice(index, 1)
      saveBlocks(this.allBlocks)
      this.addToHistory(this.allBlocks)
    },
    duplicate(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId]
      const index = findBlockIndexById(currentBlocks.blocks, blockId)

      currentBlocks.blocks.splice(index + 1, 0, {
        ...cloneObject(currentBlocks.blocks[index]),
        id: currentBlocks.nextIndex++
      })
      saveBlocks(this.allBlocks)
      this.addToHistory(this.allBlocks)
    },
    moveUp(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = findBlockIndexById(currentBlocks, blockId)
      if (index > 0) {
        replaceBlocks(currentBlocks, index - 1, index)
      }
      saveBlocks(this.allBlocks)
      this.addToHistory(this.allBlocks)
    },
    moveDown(projectId, pageId, blockId) {
      const currentBlocks = this.allBlocks[projectId][pageId].blocks
      const index = findBlockIndexById(currentBlocks, blockId)
      if (index < currentBlocks.length - 1) {
        replaceBlocks(currentBlocks, index + 1, index)
      }
      saveBlocks(this.allBlocks)
      this.addToHistory(this.allBlocks)
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
    },
    addToHistory(blocks) {
      historyService.addToHistory(cloneObject(blocks))
      if (!this.isAddHistory) {
        this.isAddHistory = true
      }
      this.changeCountHistory = this.changeCountHistory + 1
    },
    removeToHistory() {
      let history = historyService.removeToHistory()
      this.allBlocks = history[history.length - 1]
      saveBlocks(this.allBlocks)
      this.changeCountHistory = this.changeCountHistory - 1
      if (this.initCountHistory === this.changeCountHistory) {
        this.isAddHistory = false
      }
    }
  }
})

function saveBlocks(blocks) {
  setObject('allBlocks', blocks)
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