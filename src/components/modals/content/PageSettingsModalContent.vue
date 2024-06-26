<template>
  <div class="page-settings">
    <div class="modal__title">Настройка страницы</div>
    <div class="modal__content">
      <TabMenu :tabs="['Главное', 'Бейджик']">
        <template #Главное>
          <div class="page-settings__main">
            <TextField
              v-model="page.name"
              label="Заголовок"
              id="page-settings__name-field"
              type="text"
              placeholder="Заголовок страницы"
              :errorMessage="errors.name"
              :isError="!!errors.name"
            />
            <TextField
              v-model="page.description"
              label="Описание"
              id="page-settings__description-field"
              type="text"
              placeholder="Описание страницы"
            />
            <TextField
              v-model="page.address"
              label="Адрес страницы"
              id="page-settings__url-field"
              type="text"
              placeholder="Адрес страницы"
            />
          </div>
        </template>
        <template #Бейджик>
          <div class="page-settings__badge">
            <RoundedButton class="page-settings__open-image-modal" @click="openImageModal">
              Выбрать изображение
            </RoundedButton>
          </div>
        </template>
      </TabMenu>
    </div>
    <div class="modal__actions">
      <RoundedButton @click="updatePage"> Сохранить </RoundedButton>
    </div>
  </div>
</template>

<script>
import TabMenu from '@/components/global/TabMenu.vue'
import TextField from '@/components/global/TextField.vue'
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import ImageSelectorModalContent from './ImageSelectorModalContent.vue'
import { useModalStore } from '@/stores/modal.js'
import { usePagesStore } from '@/stores/pages.js'
import { useProjectsStore } from '@/stores/projects.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TabMenu,
    TextField,
    RoundedButton
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, ['getCurrentPage', 'currentId']),
    ...mapState(useModalStore, ['selectedImageSrc'])
  },
  data() {
    return {
      page: {
        name: '',
        imageSrc: '',
        description: '',
        address: ''
      },
      searchImageQuery: '',
      imagesUrls: [],
      errors: {
        name: ''
      }
    }
  },
  watch: {
    currentId: {
      handler(newId, oldId) {
        this.page = JSON.parse(JSON.stringify(this.getCurrentPage(this.projectId)))
      },
      immediate: true
    },
    selectedImageSrc(newSrc, oldSrc) {
      this.page.imageSrc = newSrc
    }
  },
  methods: {
    ...mapActions(useModalStore, ['close', 'open', 'setSelectedImageSrc']),
    ...mapActions(usePagesStore, ['update']),
    updatePage() {
      if (this.validateMainForm()) {
        this.update(this.currentId, this.projectId, this.page)
        this.close()
        this.clearErrors()
      } else {
        this.errors.name = 'Ведите заголовок'
      }
    },
    openImageModal() {
      this.setSelectedImageSrc(this.page.imageSrc)
      this.open(ImageSelectorModalContent)
    },
    validateMainForm() {
      return !!this.page.name
    },
    clearErrors() {
      Object.keys(this.errors).forEach((field) => {
        this.errors[field] = ''
      })
    }
  }
}
</script>
