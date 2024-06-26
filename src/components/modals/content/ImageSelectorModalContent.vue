<template>
  <div class="image-selector">
    <div class="modal__title">Выбор изображения</div>
    <div class="modal__content">
      <div class="image-selector__badge">
        <div class="image-selector__badge-search">
          <TextField
            v-model="searchImageQuery"
            label="Поиск изображения"
            id="image-selector__image-url-field"
            type="url"
            placeholder="Поиск"
            @keyup.enter="findImage"
          />
          <RoundedButton @click="findImage"> Найти </RoundedButton>
        </div>
        <div v-if="imagesUrls.length !== 0" class="image-selector__images">
          <img
            v-for="url in imagesUrls"
            :key="url"
            :src="url"
            :class="{ 'image-selector__image--active': url === selectedSrc }"
            @click="() => setImage(url)"
          />
        </div>
        <div v-else class="image-selector__images-empty-text">Изображений не найдено</div>
        <RoundedButton class="image-selector__remove-image-button" @click="removeImage">
          Удалить изображение
        </RoundedButton>
      </div>
    </div>
    <div class="modal__actions">
      <RoundedButton @click="selectImage"> Сохранить </RoundedButton>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/global/TextField.vue'
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import { useModalStore } from '@/stores/modal.js'
import { mapActions, mapState } from 'pinia'
import { searchImage } from '@/api/unsplash.js'

export default {
  components: {
    TextField,
    RoundedButton
  },
  computed: {
    ...mapState(useModalStore, ['selectedImageSrc'])
  },
  data() {
    return {
      selectedSrc: '',
      searchImageQuery: '',
      imagesUrls: []
    }
  },
  methods: {
    ...mapActions(useModalStore, ['close', 'setSelectedImageSrc']),
    selectImage() {
      this.setSelectedImageSrc(this.selectedSrc)
      this.close()
    },
    setImage(src) {
      this.selectedSrc = src
    },
    removeImage() {
      this.selectedSrc = ''
    },
    async findImage() {
      this.imagesUrls = await searchImage(this.searchImageQuery)
    }
  },
  mounted() {
    this.selectedSrc = this.selectedImageSrc
  }
}
</script>
