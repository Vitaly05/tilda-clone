import { defineStore } from 'pinia'

export const usePagesStore = defineStore('pages', {
  state: () => ({
    currentId: 1,
    allPages: {
      1: {
        nextId: 3,
        pages: {
          1: {
            name: 'Page 1',
            imageSrc: '/src/assets/images/page-card/page-1.jpg'
          },
          2: {
            name: 'Page 2'
          }
        }
      }
    }
  }),
  getters: {
    getPages() {
      return (projectId) => {
        if (!this.allPages[projectId]) {
          this.allPages[projectId] = {
            nextId: 1,
            pages: {}
          }
        }
        return this.allPages[projectId].pages
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
    },
    remove(id, projectId) {
      delete this.allPages[projectId].pages[id]
    },
    update(id, projectId, pageData) {
      this.allPages[projectId].pages[id] = JSON.parse(JSON.stringify(pageData))
    },
    setCurrentId(id) {
      this.currentId = id
    }
  }
})
