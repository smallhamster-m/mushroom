<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="control-item"
      @click="itemClick(index)"
      :class="{ active: currentIndex === index }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('controlClick', index)
    }
  }
}

</script>
<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
}
.control-item {
  flex: 1;
  text-align: center;
}
.control-item span {
  padding: 5px;
}
.active span {
  color: var(--color-tint);
  border-bottom: 3px solid var(--color-tint);
}
</style>