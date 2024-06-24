<script>
import TextButton from '@/components/global/buttons/TextButton.vue'
import IconAdd from '@/components/icons/IconAdd.vue'

export default {
  components: {
    TextButton,
    IconAdd
  },
  emits: ['addNew']
}
</script>
<template>
  <div class="projects__header">
    <div class="projects__header-text">Мои сайты:</div>
    <TextButton @click="$emit('addNew')">
      <IconAdd />
      Создать новый сайт
    </TextButton>
  </div>
</template>
