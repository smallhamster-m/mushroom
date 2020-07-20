<template>
  <div class="category-menu">
    <scroll class="content" :probeType="0" :pullUpLoad="true" ref="scroll">
      <div
        class="category-item"
        v-for="(item, index) in categoryTitles"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index)"
      >
        {{ item }}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'CategoryMenu',
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    categoryTitles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  updated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('menuClick', index)
      
    }
  }
}

</script>
<style scoped>
.category-menu {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100px;
  /* height: 100px; */
  float: left;
  overflow: hidden;
  background-color: #f6f6f6;
}
.category-item {
  width: 100%;
  height: 45px;
  line-height: 45px;
  /* background-color: red; */
  text-align: center;
  font-size: 14px;
}
.content {
  height: 100%;
}
.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>