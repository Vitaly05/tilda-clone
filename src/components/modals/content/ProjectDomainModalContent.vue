<template>
  <div class="project-domain">
    <div class="modal__title">Настройка страницы</div>
    <div class="modal__content">
      <TextField
        v-model="domain"
        label="Домен"
        id="project-domain-field"
        type="text"
        placeholder="Имя домена"
        :errorMessage="errorMessage"
        :isError="!!errorMessage"
      />
    </div>
    <div class="modal__actions">
      <RoundedButton @click="updateDomain"> Сохранить </RoundedButton>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/global/TextField.vue'
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import { useModalStore } from '@/stores/modal.js'
import { mapActions } from 'pinia'

export default {
  components: {
    TextField,
    RoundedButton
  },
  methods: {
    ...mapActions(useModalStore, ['close']),
    updateDomain() {
      if (this.domain) {
        this.errorMessage = ''
        this.close()
      } else {
        this.errorMessage = 'Введите домен'
      }
    }
  },
  data() {
    return {
      domain: '',
      errorMessage: ''
    }
  }
}
</script>
