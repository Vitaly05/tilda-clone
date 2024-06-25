<template>
  <div class="tab-menu">
    <div class="tab-menu__tabs">
      <div
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-menu__tab', { 'tab-menu__tab--active': tab === selectedTab }]"
        @click="selectTab(tab)"
      >
        {{ tab }}
      </div>
    </div>
    <div class="tab-menu__content">
      <slot :name="selectedTab"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabMenu',
  data() {
    return {
      selectedTab: null
    }
  },
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  mounted() {
    if (this.tabs.length > 0) {
      this.selectedTab = this.tabs[0]
    }
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab
    }
  }
}
</script>
