<template>
  <header class="header" :class="headerClass">
    <div class="header__wrap">
      <div class="header__left-buttons">
        <RouterLink to="/" class="header__logo">
          <IconTilda />
        </RouterLink>
        <RouterLink to="/" class="header__link">Мои сайты</RouterLink>
        <RouterLink to="/profile" class="header__link">Профиль</RouterLink>
      </div>
      <div class="header__right-buttons">
        <TextButton text-color="secondary" @click="logout"> Выйти </TextButton>
      </div>
    </div>
  </header>
</template>

<script>
import IconTilda from '@/components/icons/IconTilda.vue'
import TextButton from '@/components/global/buttons/TextButton.vue'
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    RouterLink,
    IconTilda,
    TextButton
  },
  computed: {
    headerClass() {
      return { 'header--hidden': ['login', 'project-page-preview'].includes(this.$route.name) }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['removeAccessToken']),
    logout() {
      this.removeAccessToken()
      this.$router.push('/login')
    }
  }
}
</script>
