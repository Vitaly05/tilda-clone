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
      <TextButton @click="() => remove(id, projectId)">
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
import { usePagesStore } from '@/stores/pages.js'
import { useProjectsStore } from '@/stores/projects.js'
import { mapActions, mapState } from 'pinia'
import PageSettingsModalContent from '@/components/modals/content/PageSettingsModalContent.vue'

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
      type: String
    }
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' })
  },
  methods: {
    ...mapActions(useModalStore, ['open']),
    ...mapActions(usePagesStore, ['setCurrentId', 'remove']),
    openSettingsModal() {
      this.setCurrentId(this.id)
      this.open(PageSettingsModalContent)
    }
  }
}
</script>
