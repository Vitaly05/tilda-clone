<template>
  <swiper-slide v-for="(image, index) in block.slideImages" :key="image.id">
    <img
      class="images-slider-block__image"
      :src="image.src"
      :draggable="true"
      :class="{
        'images-slider-block__image--draggable': true,
        'images-slider-block__image--drag-over': dragOverIndex === index
      }"
      @dragstart="onDragStart(index)"
      @dragover.prevent="onDragOver(index)"
      @dragleave="onDragLeave"
      @drop="onDrop(index)"
      @click="() => $emit('click', index)"
    />
  </swiper-slide>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  emits: ['click', 'drop'],
  data() {
    return {
      isDragStart: false,
      draggedIndex: null,
      dragOverIndex: null
    }
  },
  methods: {
    onDragStart(index) {
      this.isDragStart = true
      this.draggedIndex = index
    },
    onDragOver(index) {
      this.dragOverIndex = index
    },
    onDragLeave() {
      this.dragOverIndex = null
    },
    onDrop(index) {
      if (this.isDragStart) {
        this.$emit('drop', index, this.draggedIndex)
        this.draggedIndex = null
        this.dragOverIndex = null
        this.isDragStart = false
      }
    }
  }
}
</script>
