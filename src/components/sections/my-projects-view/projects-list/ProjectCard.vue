<template>
  <button class="project-card" @click.self="goToProjectPage">
    <div class="project-card__title">{{ title }}</div>
    <div class="project-card__more-container">
      <Dropdown :show="dropDownShow" @toggle="() => toggleDropDown(id)">
        <div class="project-card__more-button">
          <IconMore />
        </div>
        <template #items>
          <DropDownButtonItem @click="() => console.log('Rename')">
            Переименовать
          </DropDownButtonItem>
          <DropDownButtonItem @click="() => remove(id)"> Удалить сайт </DropDownButtonItem>
        </template>
      </Dropdown>
    </div>
    <div class="project-card__actions">
      <TextButton class="project-card__button">
        <IconEdit />
        Редактировать сайт
      </TextButton>
      <TextButton class="project-card__button" @click="goToProjectPage">
        <IconOpen />
        Открыть сайт
      </TextButton>
    </div>
  </button>
</template>

<script>
import IconMore from '@/components/icons/IconMore.vue'
import TextButton from '@/components/global/buttons/TextButton.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconOpen from '@/components/icons/IconOpen.vue'
import Dropdown from '@/components/global/dropdown/DropDown.vue'
import DropDownButtonItem from '@/components/global/dropdown/DropDownButtonItem.vue'
import { RouterLink } from 'vue-router'
import { useProjectsStore } from '@/stores/projects.js'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    IconMore,
    TextButton,
    IconEdit,
    IconOpen,
    Dropdown,
    DropDownButtonItem,
    RouterLink
  },
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    dropDownShow: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState(useProjectsStore, ['currentId'])
  },
  methods: {
    ...mapActions(useProjectsStore, ['remove', 'toggleDropDown']),
    goToProjectPage() {
      this.$router.push(`/project/${this.id}`)
    }
  }
}
</script>
