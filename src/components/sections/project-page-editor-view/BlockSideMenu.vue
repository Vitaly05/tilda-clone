<template>
  <div class="block-side-menu" :class="{ 'block-side-menu--open': isOpen }">
    <div class="block-side-menu__backdrop" @click="closeMenu"></div>
    <div class="block-side-menu__content">
      <div class="block-side-menu__library">
        <div class="block-side-menu__search-panel">
          <TextField placeholder="Библиотека блоков" />
          <TextButton>
            <IconSearch />
          </TextButton>
          <TextButton @click="closeMenu">
            <IconClose />
          </TextButton>
        </div>
        <div class="block-side-menu__categories">
          <TextButton
            :class="{ 'block-side-menu__category--active': activeCategory === 'text' }"
            @click="activeCategory = 'text'"
          >
            Текстовые блоки
          </TextButton>
          <TextButton
            :class="{ 'block-side-menu__category--active': activeCategory === 'images' }"
            @click="activeCategory = 'images'"
          >
            Обложки
          </TextButton>
        </div>
      </div>
      <div v-if="activeCategory === 'text'" class="block-side-menu__blocks">
        <button class="block-side-menu__block" @click="addTextBlock">
          <div class="block__title">Блок с текстом</div>
          <div class="block__description">Простой блок с текстом по центру</div>
        </button>
      </div>
      <div v-else-if="activeCategory === 'images'" class="block-side-menu__blocks">
        <button class="block-side-menu__block" @click="addImageTextBlock">
          <div class="block__title">Блок с текстом и фоновой картинкой</div>
          <div class="block__description">Блок с обложкой и текстом по центру</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/global/TextField.vue'
import TextButton from '@/components/global/buttons/TextButton.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { useProjectsStore } from '@/stores/projects'
import { usePagesStore } from '@/stores/pages'
import { useBlocksStore } from '@/stores/blocks'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    TextField,
    TextButton,
    IconSearch,
    IconClose
  },
  data() {
    return {
      activeCategory: 'text'
    }
  },
  computed: {
    ...mapState(useProjectsStore, { projectId: 'currentId' }),
    ...mapState(usePagesStore, { pageId: 'currentId' }),
    ...mapState(useBlocksStore, { isOpen: 'sideMenuIsOpen', beforeBlockId: 'beforeBlockId' })
  },
  methods: {
    ...mapActions(useBlocksStore, ['add', 'closeSideMenu', 'setBeforeBlockId']),
    closeMenu() {
      this.setBeforeBlockId(undefined)
      this.closeSideMenu()
    },
    addTextBlock() {
      this.addBlock({
        type: 'text',
        text: 'default text'
      })
    },
    addImageTextBlock() {
      this.addBlock({
        type: 'image-text',
        text: 'default image text',
        imageSrc: '/src/assets/images/page-card/page-1.jpg'
      })
    },
    addBlock(pageData) {
      this.add(this.projectId, this.pageId, pageData, this.beforeBlockId)
    }
  }
}
</script>
