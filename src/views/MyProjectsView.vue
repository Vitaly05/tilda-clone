<template>
  <main>
    <ProjectsHeader @addNew="addNewProject" />
    <ProjectsList :projects="projects" @removeCard="remove" @toggleDropDown="toggleDropDown" />
  </main>
</template>

<script>
import ProjectsHeader from '@/components/sections/my-projects-view/ProjectsHeader.vue'
import ProjectsList from '@/components/sections/my-projects-view/ProjectsList.vue'
import { useProjectsStore } from '@/stores/projects.js'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    ProjectsHeader,
    ProjectsList
  },
  computed: {
    ...mapState(useProjectsStore, ['projects'])
  },
  methods: {
    ...mapActions(useProjectsStore, ['add', 'remove', 'toggleDropDown']),
    addNewProject() {
      this.add('Project')
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
