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
  data() {
    return {
      projectId: this.$route.params.id
    }
  },
  computed: {
    ...mapState(usePagesStore, ['getPages'])
  },
  methods: {
    ...mapActions(useProjectsStore, ['setCurrentId']),
    ...mapActions(usePagesStore, ['add', 'remove']),
    addPage() {
      this.add('Page', this.projectId)
    }
  },
  mounted() {
    this.setCurrentId(this.projectId)
  }
}
</script>
