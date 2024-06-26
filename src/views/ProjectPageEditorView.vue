<template>
  <main class="page-editor__wrap">
    <PageEditorHeader />
    <div class="page-editor__blocks-wrap">
      <TransitionGroup name="blocks">
        <PageBlock
          v-for="(block, index) in getBlocks(projectId, pageId)"
          :key="index"
          :block="block"
        />
      </TransitionGroup>
    </div>
    <RoundedButton class="page-editor__insert-block" @click="openBlockSideMenu">
      <IconAdd />
      Добавить запись
    </RoundedButton>
    <BlockSideMenu />
  </main>
</template>

<script>
import PageBlock from '@/components/sections/project-page-editor-view/PageBlock.vue'
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import BlockSideMenu from '@/components/sections/project-page-editor-view/BlockSideMenu.vue'
import PageEditorHeader from '@/components/sections/project-page-editor-view/PageEditorHeader.vue'
import { useProjectsStore } from '@/stores/projects'
import { usePagesStore } from '@/stores/pages'
import { useBlocksStore } from '@/stores/blocks'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    PageBlock,
    RoundedButton,
    IconAdd,
    BlockSideMenu,
    PageEditorHeader
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' }),
    ...mapState(useBlocksStore, ['getBlocks'])
  },
  methods: {
    ...mapActions(usePagesStore, { setCurrentPageId: 'setCurrentId' }),
    ...mapActions(useBlocksStore, ['add', 'openSideMenu']),
    openBlockSideMenu() {
      this.openSideMenu()
    }
  },
  mounted() {
    this.setCurrentPageId(this.$route.params.pageId)
  }
}
</script>
