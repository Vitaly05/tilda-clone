<template>
  <div class="page-block" :class="{ 'page-block--read-only': readOnly }">
    <TextBlock v-if="block.type === 'text'" :block="block" :readOnly="readOnly" />
    <ImageTextBlock v-if="block.type === 'image-text'" :block="block" :readOnly="readOnly" />
    <ImagesSliderBlock v-if="block.type === 'images-slider'" :block="block" :readOnly="readOnly" />
    <RoundedButton class="page-block__edit-content-button" @click="openEditBlockModal">
      Контент
    </RoundedButton>
    <RoundedButton class="page-block__add-block-button" @click="openBlockSideMenu">
      <IconAdd />
    </RoundedButton>
    <div class="page-block__block-actions">
      <TextButton @click="moveBlockUp"> <IconToTop /> </TextButton>
      <TextButton @click="cloneBlock"> <IconDuplicate /> </TextButton>
      <TextButton @click="removeBlock"> <IconTrash /> </TextButton>
      <TextButton @click="moveBlockDown"> <IconToBottom /> </TextButton>
    </div>
  </div>
</template>

<script>
import TextBlock from '@/components/sections/project-page-editor-view/block-types/TextBlock.vue'
import ImageTextBlock from '@/components/sections/project-page-editor-view/block-types/ImageTextBlock.vue'
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import TextButton from '@/components/global/buttons/TextButton.vue'
import IconToTop from '@/components/icons/IconToTop.vue'
import IconDuplicate from '@/components/icons/IconDuplicate.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconToBottom from '@/components/icons/IconToBottom.vue'
import TextBlockSettingsModalContent from '@/components/modals/content/TextBlockSettingsModalContent.vue'
import ImageTextBlockSettingsModalContent from '@/components/modals/content/ImageTextBlockSettingsModalContent.vue'
import ImagesSliderBlock from './block-types/ImagesSliderBlock.vue'
import { useModalStore } from '@/stores/modal'
import { useBlocksStore } from '@/stores/blocks'
import { useProjectsStore } from '@/stores/projects'
import { usePagesStore } from '@/stores/pages'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TextBlock,
    ImageTextBlock,
    TextButton,
    RoundedButton,
    IconAdd,
    IconToTop,
    IconDuplicate,
    IconTrash,
    IconToBottom,
    ImagesSliderBlock
  },
  props: {
    block: {
      type: Object,
      required: true
    },
    readOnly: Boolean
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' })
  },
  methods: {
    ...mapActions(useBlocksStore, [
      'setBeforeBlockId',
      'openSideMenu',
      'duplicate',
      'remove',
      'moveUp',
      'moveDown',
      'setCurrentId'
    ]),
    ...mapActions(useModalStore, { openModal: 'open' }),
    openBlockSideMenu() {
      this.setBeforeBlockId(this.block.id)
      this.openSideMenu()
    },
    cloneBlock() {
      this.duplicate(this.projectId, this.pageId, this.block.id)
    },
    removeBlock() {
      this.remove(this.projectId, this.pageId, this.block.id)
    },
    moveBlockUp() {
      this.moveUp(this.projectId, this.pageId, this.block.id)
    },
    moveBlockDown() {
      this.moveDown(this.projectId, this.pageId, this.block.id)
    },
    openEditBlockModal() {
      this.setCurrentId(this.block.id)
      switch (this.block.type) {
        case 'text':
          this.openModal(TextBlockSettingsModalContent)
          break
        case 'image-text': {
          this.openModal(ImageTextBlockSettingsModalContent)
          break
        }
      }
    }
  }
}
</script>
