<template>
  <div class="project__header">
    <div class="project__header-wrap">
      <div class="header__top-container">
        <TextButton @click="openDomainModal">
          <IconGlobal />
          Подключить домен
        </TextButton>
        <TextButton>
          <IconOpen />
          Адрес сайта:
        </TextButton>
      </div>
      <div class="header__main-container">
        <div class="project__name">Project {{ $route.params.id }}</div>
        <RoundedButton @click="$emit('addNewPage')">
          <IconAdd />
          Создать новую страницу
        </RoundedButton>
      </div>
    </div>
  </div>
</template>

<script>
import TextButton from '@/components/global/buttons/TextButton.vue'
import RoundedButton from '@/components/global/buttons/RoundedButton.vue'
import IconGlobal from '@/components/icons/IconGlobal.vue'
import IconOpen from '@/components/icons/IconOpen.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import { useModalStore } from '@/stores/modal.js'
import { mapActions } from 'pinia'
import ProjectDomain from '@/components/modals/content/ProjectDomain.vue'

export default {
  components: {
    TextButton,
    RoundedButton,
    IconGlobal,
    IconOpen,
    IconAdd
  },
  emits: ['addNewPage'],
  methods: {
    ...mapActions(useModalStore, ['open']),
    openDomainModal() {
      this.open(ProjectDomain)
    }
  }
}
</script>
