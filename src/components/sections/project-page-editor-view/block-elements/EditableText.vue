<template>
  <div
    class="page-block__editable-text"
    contenteditable
    @blur="updateBlockText($event.target.innerText)"
  >
    {{ block?.text }}
  </div>
</template>

<script>
import { useProjectsStore } from '@/stores/projects'
import { usePagesStore } from '@/stores/pages'
import { useBlocksStore } from '@/stores/blocks'
import { mapActions, mapState } from 'pinia'

export default {
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' })
  },
  methods: {
    ...mapActions(useBlocksStore, ['updateText']),
    updateBlockText(newText) {
      this.updateText(this.projectId, this.pageId, this.block.id, newText)
    }
  }
}
</script>
