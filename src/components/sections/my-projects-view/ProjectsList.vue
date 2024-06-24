<script>
import ProjectCard from '@/components/sections/my-projects-view/projects-list/ProjectCard.vue'

export default {
  components: {
    ProjectCard
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  emits: ['removeCard', 'toggleDropDown']
}
</script>

<template>
  <div v-if="projects.length !== 0" class="projects__list">
    <ProjectCard
      v-for="(project, index) in projects"
      :key="index"
      :title="`${project.name} ${index + 1}`"
      :id="index"
      :dropDownShow="project.dropDownShow"
      @remove="(index) => $emit('removeCard', index)"
      @toggleDropDown="$emit('toggleDropDown', index)"
    />
  </div>
  <div v-else class="projects__empty-list-text">Нет ни одного проекта</div>
</template>
