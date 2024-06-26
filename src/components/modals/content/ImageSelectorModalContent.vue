<template>
  <div class="page-settings">
    <div class="modal__title">Выбор изображения</div>
    <div class="modal__content">
      <div class="page-settings__badge">
        <div class="badge__title">Изображение бейджика</div>
        <div class="page-settings__badge-search">
          <TextField
            v-model="searchImageQuery"
            label="Поиск изображения"
            id="page-settings__image-url-field"
            type="url"
            placeholder="Поиск"
            @keyup.enter="findImage"
          />
          <RoundedButton @click="findImage"> Найти </RoundedButton>
        </div>
        <div v-if="imagesUrls.length !== 0" class="page-settings__images">
          <img
            v-for="url in imagesUrls"
            :key="url"
            :src="url"
            :class="{ 'page-settings__image--active': url === selectedSrc }"
            @click="() => setImage(url)"
          />
        </div>
        <div v-else class="page-settings__images-empty-text">Изображений не найдено</div>
        <RoundedButton class="page-settings__remove-image-button" @click="removeImage">
          Удалить бейджик
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
import { usePagesStore } from '@/stores/pages.js'
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
