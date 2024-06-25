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
              label="Описание"
              id="page-settings__description-field"
              type="text"
              placeholder="Описание страницы"
            />
            <TextField
              label="Адрес страницы"
              id="page-settings__url-field"
              type="text"
              placeholder="Адрес страницы"
            />
          </div>
        </template>
        <template #Бейджик>
          <div class="page-settings__badge">
            <div class="badge__title">Изображение бейджика</div>
            <div class="page-settings__badge-search">
              <TextField
                v-model="searchImageQuery"
                label="Поиск изображения"
                id="page-settings__image-url-field"
                type="url"
                placeholder="Поиск"
              />
              <RoundedButton @click="findImage"> Найти </RoundedButton>
            </div>
            <div class="page-settings__images">
              <img
                v-for="url in imagesUrls"
                :key="url"
                :src="url"
                @click="() => setImage(url)"
                :class="{ 'page-settings__image--active': url === page.imageSrc }"
              />
            </div>
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
import { useModalStore } from '@/stores/modal.js'
import { usePagesStore } from '@/stores/pages.js'
import { useProjectsStore } from '@/stores/projects.js'
import { mapActions, mapState } from 'pinia'
import { searchImage } from '@/api/unsplash.js'

export default {
  components: {
    TabMenu,
    TextField,
    RoundedButton
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, ['getCurrentPage', 'currentId']),
    currentPage() {
      return this.getCurrentPage(this.projectId).name
    }
  },
  data() {
    return {
      page: {
        name: '',
        imageSrc: ''
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
    }
  },
  methods: {
    ...mapActions(useModalStore, ['close']),
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
    setImage(src) {
      this.page.imageSrc = src
    },
    async findImage() {
      this.imagesUrls = await searchImage(this.searchImageQuery)
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
