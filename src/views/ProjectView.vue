<template>
  <main>
    <ProjectHeader @addNewPage="addPage" />
    <PagesList :pages="getPages($route.params.id)" @remove="removePage" />
  </main>
</template>

<script>
import ProjectHeader from '@/components/sections/project-view/ProjectHeader.vue'
import PagesList from '@/components/sections/project-view/PagesList.vue'
import { usePagesStore } from '@/stores/pages.js'
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
    ...mapActions(usePagesStore, ['add', 'remove']),
    addPage() {
      this.add('Page', this.projectId)
    },
    removePage(id) {
      this.remove(id, this.projectId)
    }
  }
}
</script>
