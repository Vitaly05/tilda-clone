<template>
  <div class="images-slider-block" :class="{ 'images-slider-block--read-only': readOnly }">
    <div class="images-slider-block__content">
      <swiper-container
        v-if="readOnly"
        slides-per-view="3"
        allow-touch-move="true"
        spaceBetween="30"
        navigation="true"
      >
        <swiper-slide v-for="(image, index) in block.slideImages" :key="image.id">
          <img class="images-slider-block__image" :src="image.src" @click="openModal(index)" />
        </swiper-slide>
      </swiper-container>
      <swiper-container
        v-else
        slides-per-view="3"
        allow-touch-move="false"
        spaceBetween="30"
        navigation="true"
      >
        <GrabAndDropImagesSlides :block="block" @click="openModal" @drop="onDrop" />
      </swiper-container>
    </div>
  </div>
</template>

<script>
import ImageSelectorModalContent from '@/components/modals/content/ImageSelectorModalContent.vue'
import { useBlocksStore } from '@/stores/blocks'
import { useModalStore } from '@/stores/modal'
import { usePagesStore } from '@/stores/pages'
import { useProjectsStore } from '@/stores/projects'
import { mapActions, mapState } from 'pinia'
import GrabAndDropImagesSlides from '../block-elements/GrabAndDropImagesSlides.vue'

export default {
  components: {
    GrabAndDropImagesSlides
  },
  props: {
    block: {
      type: Object,
      required: true
    },
    readOnly: Boolean
  },
  data() {
    return {
      currentImageIndex: null
    }
  },
  computed: {
    ...mapState(useModalStore, ['selectedImageSrc']),
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' })
  },
  methods: {
    ...mapActions(useModalStore, ['open', 'setSelectedImageSrc']),
    ...mapActions(useBlocksStore, {
      setBlockId: 'setCurrentId',
      update: 'updateImageSlider',
      fullUpdate: 'update'
    }),
    openModal(index) {
      if (this.readOnly) {
        return
      }
      this.currentImageIndex = index
      this.setBlockId(this.block.id)
      this.open(ImageSelectorModalContent)
    },
    onDrop(index, draggedIndex) {
      const draggedItem = JSON.parse(JSON.stringify(this.block.slideImages[draggedIndex]))
      const newBlock = JSON.parse(JSON.stringify(this.block))
      newBlock.slideImages.splice(draggedIndex, 1)
      newBlock.slideImages.splice(index, 0, draggedItem)
      this.fullUpdate(this.projectId, this.pageId, this.block.id, newBlock)
    }
  },
  watch: {
    selectedImageSrc(newSrc, oldSrc) {
      if (newSrc) {
        if (this.currentImageIndex !== null) {
          this.update(this.projectId, this.pageId, this.block.id, this.currentImageIndex, newSrc)
          this.currentImageIndex = null
        }
      }
    }
  }
}
</script>
