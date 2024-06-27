<template>
  <main>
    <ProjectHeader @addNewPage="addPage" />
    <PagesList :pages="getPages(projectId)" />
  </main>
</template>

<script>
import ProjectHeader from '@/components/sections/project-view/ProjectHeader.vue'
import PagesList from '@/components/sections/project-view/PagesList.vue'
import { usePagesStore } from '@/stores/pages.js'
import { useProjectsStore } from '@/stores/projects.js'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    ProjectHeader,
    PagesList
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, ['getPages'])
  },
  methods: {
    ...mapActions(usePagesStore, ['add', 'remove']),
    addPage() {
      this.add('Page', this.projectId)
    }
  }
}
</script>
