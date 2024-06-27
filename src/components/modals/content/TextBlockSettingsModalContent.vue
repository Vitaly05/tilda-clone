<template>
  <div>
    <div class="modal__title">Настройка блока</div>
    <div class="modal__content">
      <EditableText
        class="modal__edit-block-text-panel"
        :block="getCurrentBlock(projectId, pageId)"
      />
    </div>
    <div class="modal__actions">
      <RoundedButton @click="close"> Закрыть </RoundedButton>
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

export default {
  components: {
    RoundedButton,
    EditableText
  },
  computed: {
    ...mapState(useBlocksStore, ['getCurrentBlock']),
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' })
  },
  methods: {
    ...mapActions(useModalStore, ['close'])
  }
}
</script>
