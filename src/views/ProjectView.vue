<template>
  <main>
    <ProjectHeader @addNewPage="addPage" />
    <PagesList :pages="pages" @remove="removePage" />
  </main>
</template>

<script>
import ProjectHeader from '@/components/sections/project-view/ProjectHeader.vue'
import PagesList from '@/components/sections/project-view/PagesList.vue'

export default {
  components: {
    ProjectHeader,
    PagesList
  },
  data() {
    return {
      pages: [
        {
          name: 'Page',
          imageSrc: '/src/assets/images/page-card/page-1.jpg'
        },
        {
          name: 'Page'
        }
      ]
    }
  },
  methods: {
    addPage() {
      this.pages.push({
        name: 'Page'
      })
    },
    removePage(index) {
      this.pages.splice(index, 1)
    }
  }
}
</script>
