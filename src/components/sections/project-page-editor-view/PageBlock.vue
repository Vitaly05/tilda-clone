<template>
  <div class="page-block">
    <TextBlock v-if="block.type === 'text'" :block="block" />
    <ImageTextBlock v-if="block.type === 'image-text'" :block="block" />
    <RoundedButton class="page-block__edit-content-button"> Контент </RoundedButton>
    <RoundedButton class="page-block__add-block-button" @click="openBlockSideMenu">
      <IconAdd />
    </RoundedButton>
    <div class="page-block__block-actions">
      <TextButton> <IconToTop /> </TextButton>
      <TextButton> <IconDuplicate /> </TextButton>
      <TextButton> <IconTrash /> </TextButton>
      <TextButton> <IconToBottom /> </TextButton>
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
import { useBlocksStore } from '@/stores/blocks'
import { mapActions } from 'pinia'

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
    IconToBottom
  },
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(useBlocksStore, ['setBeforeBlockId', 'openSideMenu']),
    openBlockSideMenu() {
      this.setBeforeBlockId(this.block.id)
      this.openSideMenu()
    }
  }
}
</script>
