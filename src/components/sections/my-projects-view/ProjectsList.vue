<template>
  <div v-if="projects.length !== 0" class="projects__list">
    <ProjectCard
      v-for="(project, index) in projects"
      :key="index"
      :title="`${project.name} ${index}`"
      :id="parseInt(index)"
      :dropDownShow="project.dropDownShow"
    />
  </div>
  <div v-else class="projects__empty-list-text">Нет ни одного проекта</div>
</template>

<script>
import ProjectCard from '@/components/sections/my-projects-view/projects-list/ProjectCard.vue'

export default {
  components: {
    ProjectCard
  },
  props: {
    projects: {
      type: Object,
      required: true
    }
  }
}
</script>
