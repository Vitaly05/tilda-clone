import { getObject, setObject } from '@/helpers/localStorage'
import { defineStore } from 'pinia'

const defaultPages = {
  1: {
    nextId: 3,
    pages: {
      1: {
        name: 'Page 1',
        imageSrc: '/src/assets/images/page-card/page-1.jpg',
        description: 'default',
        address: 'default'
      },
      2: {
        name: 'Page 2'
      }
    }
  }
}

let storedPages = getObject('allPages')
if (!storedPages) {
  storedPages = defaultPages
  savePages(defaultPages)
}

export const usePagesStore = defineStore('pages', {
  state: () => ({
    currentId: 1,
    allPages: storedPages
  }),
  getters: {
    getPages: (state) => {
      return (projectId) => {
        let projectPages = state.allPages[projectId]
        if (!projectPages) {
          projectPages = {
            nextId: 1,
            pages: {}
          }
        }
        return projectPages.pages
      }
    },
    getCurrentPage() {
      return (projectId) => this.allPages[projectId].pages[this.currentId]
    }
  },
  actions: {
    add(name, projectId) {
      if (!this.allPages[projectId]) {
        this.allPages[projectId] = {
          nextId: 1,
          pages: {}
        }
      }
      const currentProject = this.allPages[projectId]
      currentProject.pages[currentProject.nextId] = {
        name: `${name} ${currentProject.nextId}`
      }
      currentProject.nextId++
      savePages(this.allPages)
    },
    remove(id, projectId) {
      delete this.allPages[projectId].pages[id]
      savePages(this.allPages)
    },
    update(id, projectId, pageData) {
      this.allPages[projectId].pages[id] = JSON.parse(JSON.stringify(pageData))
      savePages(this.allPages)
    },
    setCurrentId(id) {
      this.currentId = id
    }
  }
})

function savePages(pages) {
  setObject('allPages', pages)
}
