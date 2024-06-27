<template>
  <header class="editor-header">
    <div class="editor-header__left-container">
      <div class="editor-header__page-name">{{ getCurrentPage(projectId)?.name }}</div>
    </div>
    <div class="editor-header__right-container">
      <router-link :to="`/project/${projectId}/preview-page/${pageId}`">
        <TextButton> Предпросмотр </TextButton>
      </router-link>
      <DropDown :show="dropDownIsOpen">
        <TextButton @click="dropDownIsOpen = !dropDownIsOpen">
          Еще
          <IconDropDown />
        </TextButton>
        <template #items>
          <DropDownButtonItem @click="showPageSettingsModal">
            Настройки страницы
          </DropDownButtonItem>
          <DropDownButtonItem @click="goToMyProjects"> Мои сайты </DropDownButtonItem>
          <DropDownButtonItem @click="goToProfile"> Профиль </DropDownButtonItem>
        </template>
      </DropDown>
    </div>
  </header>
</template>

<script>
import TextButton from '@/components/global/buttons/TextButton.vue'
import DropDown from '@/components/global/dropdown/DropDown.vue'
import DropDownButtonItem from '@/components/global/dropdown/DropDownButtonItem.vue'
import IconDropDown from '@/components/icons/IconDropDown.vue'
import PageSettingsModalContent from '@/components/modals/content/PageSettingsModalContent.vue'
import { useModalStore } from '@/stores/modal'
import { useProjectsStore } from '@/stores/projects'
import { usePagesStore } from '@/stores/pages'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TextButton,
    DropDown,
    DropDownButtonItem,
    IconDropDown
  },
  data() {
    return {
      dropDownIsOpen: false
    }
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' }),
    ...mapState(usePagesStore, ['getCurrentPage'])
  },
  methods: {
    ...mapActions(useModalStore, ['open']),
    ...mapActions(usePagesStore, { setCurrentPageId: 'setCurrentId' }),
    goToMyProjects() {
      this.$router.push('/')
    },
    goToProfile() {
      this.$router.push('/profile')
    },
    showPageSettingsModal() {
      this.open(PageSettingsModalContent)
    },
    closeDropDown() {
      this.dropDownIsOpen = false
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropDown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropDown)
  }
}
</script>
