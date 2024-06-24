<script>
import HeaderPage from '@/components/sections/HeaderPage.vue'
import ProjectsHeader from '@/components/sections/my-projects-view/ProjectsHeader.vue'
import ProjectsList from '@/components/sections/my-projects-view/ProjectsList.vue'
import { nextTick } from 'vue'

export default {
  components: {
    HeaderPage,
    ProjectsHeader,
    ProjectsList
  },
  data() {
    return {
      projects: [
        { name: 'My project', dropDownShow: false },
        { name: 'My project', dropDownShow: false },
        { name: 'My project', dropDownShow: false },
        { name: 'My project', dropDownShow: false }
      ]
    }
  },
  methods: {
    addNewProject() {
      this.projects.push({ name: 'My project', dropDownShow: false })
    },
    removeCard(index) {
      this.projects.splice(index, 1)
      console.log(`Removed project with index = ${index}`)
    },
    toggleDropDown(index) {
      const show = !this.projects[index].dropDownShow
      this.hideAllDropDowns()
      this.projects[index].dropDownShow = show
    },
    hideAllDropDowns() {
      this.projects.forEach((project) => (project.dropDownShow = false))
    }
  },
  mounted() {
    document.addEventListener('click', this.hideAllDropDowns)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideAllDropDowns)
  }
}
</script>

<template>
  <main>
    <HeaderPage />
    <ProjectsHeader @addNew="addNewProject" />
    <ProjectsList :projects="projects" @removeCard="removeCard" @toggleDropDown="toggleDropDown" />
  </main>
</template>
