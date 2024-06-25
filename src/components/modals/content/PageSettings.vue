<template>
  <div class="page-settings">
    <div class="modal__title">Настройка страницы</div>
    <div class="modal__content">
      <TabMenu :tabs="['Главное', 'Бейджик']">
        <template #Главное>
          <div class="page-settings__main">
            <TextField
              label="Заголовок"
              id="page-settings__name-field"
              type="text"
              placeholder="Заголовок страницы"
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
            <TextField
              label="Изображение"
              id="page-settings__image-url-field"
              type="url"
              placeholder="Ссылка на изображение"
            />
          </div>
        </template>
      </TabMenu>
    </div>
    <div class="modal__actions">
      <RoundedButton @click="close"> Сохранить </RoundedButton>
    </div>
  </div>
</template>

<script>
import TabMenu from '@/components/global/TabMenu.vue'
import TextField from '@/components/global/TextField.vue'
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import { useModalStore } from '@/stores/modal.js'
import { mapActions } from 'pinia'

export default {
  components: {
    TabMenu,
    TextField,
    RoundedButton
  },
  methods: {
    ...mapActions(useModalStore, ['close'])
  }
}
</script>
