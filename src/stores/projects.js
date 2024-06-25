import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    currentId: 1,
    nextId: 5,
    projects: {
      1: { name: 'My project', dropDownShow: false },
      2: { name: 'My project', dropDownShow: false },
      3: { name: 'My project', dropDownShow: false },
      4: { name: 'My project', dropDownShow: false }
    }
  }),
  actions: {
    add(name) {
      this.projects[this.nextId++] = {
        name: name,
        dropDownShow: false
      }
    },
    remove(id) {
      delete this.projects[id]
    },
    toggleDropDown(id) {
      const show = !this.projects[id].dropDownShow
      this.hideAllDropDowns()
      this.projects[id].dropDownShow = show
    },
    hideAllDropDowns() {
      Object.values(this.projects).forEach((project) => (project.dropDownShow = false))
    },
    setCurrentId(id) {
      this.currentId = id
    }
  }
})
