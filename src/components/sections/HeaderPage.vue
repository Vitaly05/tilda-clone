<script>
import NavigationLink from '@/components/sections/header-page/NavigationLink.vue'
import IconTilda from '@/components/icons/IconTilda.vue'
import TextButton from '@/components/global/buttons/TextButton.vue'

export default {
  components: {
    NavigationLink,
    IconTilda,
    TextButton
  }
}
</script>

<template>
  <header class="header">
    <div class="header__wrap">
      <div class="header__left-buttons">
        <NavigationLink url="/" class="header__logo">
          <IconTilda />
        </NavigationLink>
        <NavigationLink url="/">Мои сайты</NavigationLink>
        <NavigationLink url="/profile">Профиль</NavigationLink>
      </div>
      <div class="header__right-buttons">
        <TextButton text-color="secondary"> Выйти </TextButton>
      </div>
    </div>
  </header>
</template>
