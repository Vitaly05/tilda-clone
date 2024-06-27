<template>
  <div class="login">
    <div class="login__container">
      <IconTilda class="login__logo" />
      <div class="login__form">
        <TextField
          v-model="fields.email"
          :errorMessage="errors.email"
          :isError="!!errors.email"
          placeholder="Эл. почта"
          type="email"
        />
        <TextField
          v-model="fields.password"
          :errorMessage="errors.password"
          :isError="!!errors.password"
          placeholder="Пароль"
          type="password"
        />
      </div>
      <RoundedButton @click="login">Войти</RoundedButton>
      <div v-if="!!formError" class="login__form-error">{{ formError }}</div>
    </div>
  </div>
</template>

<script>
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import TextField from '@/components/global/TextField.vue'
import IconTilda from '@/components/icons/IconTilda.vue'
import { checkPassword, generateToken } from '@/helpers/security'
import { validateEmail, validatePassword } from '@/helpers/validator'
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia'

export default {
  components: {
    RoundedButton,
    TextField,
    IconTilda
  },
  data() {
    return {
      fields: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      },
      formError: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['setAccessToken']),
    login() {
      if (this.validateAllFields()) {
        const result = checkPassword(this.fields.password)
        if (result) {
          const accessToken = generateToken()
          this.setAccessToken(accessToken)
          this.$router.push('/')
        } else {
          this.formError = 'Неверные данные для входа'
        }
      }
    },
    validateAllFields() {
      this.clearFieldsErrors()

      const isEmailValid = validateEmail(this.fields.email)
      const isPasswordValid = validatePassword(this.fields.password)

      if (!isEmailValid) {
        this.errors.email = 'Введите верную эл. почту'
      }
      if (!isPasswordValid) {
        this.errors.password = 'Введите пароль'
      }

      return isEmailValid && isPasswordValid
    },
    clearFieldsErrors() {
      Object.keys(this.errors).forEach((key) => {
        this.errors[key] = ''
      })
    }
  }
}
</script>
