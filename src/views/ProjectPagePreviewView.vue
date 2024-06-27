<template>
  <main class="page-preview">
    <PageBlock v-for="block in getAllBlocks()" :key="block.id" :block="block" readOnly />
    <router-link
      :to="`/project/${projectId}/edit-page/${pageId}`"
      class="page-preview__back-button"
    >
      <RoundedButton> Вернуться к редактированию </RoundedButton>
    </router-link>
  </main>
</template>

<script>
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import PageBlock from '@/components/sections/project-page-editor-view/PageBlock.vue'
import { useBlocksStore } from '@/stores/blocks'
import { usePagesStore } from '@/stores/pages'
import { useProjectsStore } from '@/stores/projects'
import { mapState } from 'pinia'

export default {
  components: {
    PageBlock,
    RoundedButton
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' }),
    ...mapState(useBlocksStore, ['getBlocks'])
  },
  methods: {
    getAllBlocks() {
      return this.getBlocks(this.projectId, this.pageId)
    }
  }
}
</script>
