<template>
  <div class="projects__header">
    <div class="projects__header-text">Мои сайты:</div>
    <TextButton @click="() => add('My project')">
      <IconAdd />
      Создать новый сайт
    </TextButton>
  </div>
</template>

<script>
import TextButton from '@/components/global/buttons/TextButton.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import { useProjectsStore } from '@/stores/projects'
import { mapActions } from 'pinia'

export default {
  components: {
    TextButton,
    IconAdd
  },
  methods: {
    ...mapActions(useProjectsStore, ['add'])
  }
}
</script>
