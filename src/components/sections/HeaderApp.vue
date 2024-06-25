<template>
  <header class="header">
    <div class="header__wrap">
      <div class="header__left-buttons">
        <RouterLink to="/" class="header__logo">
          <IconTilda />
        </RouterLink>
        <RouterLink to="/" class="header__link">Мои сайты</RouterLink>
        <RouterLink to="/profile" class="header__link">Профиль</RouterLink>
      </div>
      <div class="header__right-buttons">
        <TextButton text-color="secondary"> Выйти </TextButton>
      </div>
    </div>
  </header>
</template>

<script>
import IconTilda from '@/components/icons/IconTilda.vue'
import TextButton from '@/components/global/buttons/TextButton.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink,
    IconTilda,
    TextButton
  }
}
</script>
