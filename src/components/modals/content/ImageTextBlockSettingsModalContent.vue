<template>
  <div class="image-text-block-settings">
    <div class="modal__title">Настройка блока</div>
    <div class="modal__content">
      <div class="modal__edit-block-text-panel">
        <div
          class="page-block__editable-text"
          contenteditable
          @blur="currentBlock.text = $event.target.innerText"
        >
          {{ currentBlock?.text }}
        </div>
      </div>
      <RoundedButton
        class="image-text-block-settings__select-image-button"
        @click="openSelectImageModal"
      >
        Выбрать изображение
      </RoundedButton>
    </div>
    <div class="modal__actions">
      <RoundedButton @click="saveChanges"> Сохранить </RoundedButton>
    </div>
  </div>
</template>

<script>
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import EditableText from '@/components/sections/project-page-editor-view/block-elements/EditableText.vue'
import { useModalStore } from '@/stores/modal.js'
import { useBlocksStore } from '@/stores/blocks'
import { useProjectsStore } from '@/stores/projects'
import { mapActions, mapState } from 'pinia'
import { usePagesStore } from '@/stores/pages'
import ImageSelectorModalContent from './ImageSelectorModalContent.vue'

export default {
  components: {
    RoundedButton,
    EditableText
  },
  computed: {
    ...mapState(useBlocksStore, ['getCurrentBlock']),
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' }),
    ...mapState(useModalStore, ['selectedImageSrc'])
  },
  data() {
    return {
      currentBlock: {}
    }
  },
  watch: {
    selectedImageSrc(newSrc, oldSrc) {
      this.currentBlock.imageSrc = newSrc
    }
  },
  methods: {
    ...mapActions(useModalStore, ['close', 'open']),
    ...mapActions(useBlocksStore, ['update']),
    openSelectImageModal() {
      this.open(ImageSelectorModalContent)
    },
    saveChanges() {
      this.update(this.projectId, this.pageId, this.currentBlock.id, this.currentBlock)
      this.close()
    }
  },
  mounted() {
    this.currentBlock = JSON.parse(
      JSON.stringify(this.getCurrentBlock(this.projectId, this.pageId))
    )
  }
}
</script>
