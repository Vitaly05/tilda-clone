import { defaultNextProjectId, defaultProjects } from '@/data/defaultProjects'
import { getObjectToLocalStorage, setObjectToLocalStorage } from '@/helpers/localStorage'
import { defineStore } from 'pinia'

function saveProjects(projects) {
  setObjectToLocalStorage('projects', projects)
}

function saveProjectsNextId(id) {
  localStorage.setItem('projectsNextId', id)
}

let storedProjects = getObjectToLocalStorage('projects')
if (!storedProjects) {
  storedProjects = defaultProjects
  saveProjects(defaultProjects)
}

let storedNextId = localStorage.getItem('projectsNextId')
if (!storedNextId) {
  storedNextId = defaultNextProjectId
  saveProjectsNextId(defaultNextProjectId)
}

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    currentId: 1,
    nextId: storedNextId,
    projects: storedProjects
  }),
  actions: {
    add(name) {
      this.projects[this.nextId++] = {
        name: name,
        dropDownShow: false
      }
      saveProjects(this.projects)
      saveProjectsNextId(this.nextId)
    },
    remove(id) {
      delete this.projects[id]
      saveProjects(this.projects)
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
