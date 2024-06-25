<template>
  <div class="page-card">
    <router-link
      class="page-card__left-container"
      :to="`/project/${$route.params.id}/edit/page/${id}`"
    >
      <div class="page-card__logo">
        <img v-if="imageSrc" :src="imageSrc" alt="page logo" />
      </div>
      <div class="page-card__name">{{ name }}</div>
    </router-link>
    <div class="page-card__right-container">
      <TextButton @click="openSettingsModal">
        <IconSettings />
        Настройки
      </TextButton>
      <TextButton @click="$emit('remove', id)">
        <IconTrash />
        Удалить
      </TextButton>
    </div>
  </div>
</template>

<script>
import TextButton from '@/components/global/buttons/TextButton.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import { useModalStore } from '@/stores/modal.js'
import { mapActions } from 'pinia'
import PageSettings from '@/components/modals/content/PageSettings.vue'

export default {
  components: {
    TextButton,
    IconSettings,
    IconTrash
  },
  props: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    }
  },
  emits: ['remove'],
  methods: {
    ...mapActions(useModalStore, ['open']),
    openSettingsModal() {
      this.open(PageSettings)
    }
  }
}
</script>
