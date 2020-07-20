<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="middle" class="title">
      <div
        class="title-item"
        v-for="(item, index) in titles"
        @click="itemClick(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    }
  }
}

</script>
<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-tint);
}
.back {
  text-align: center;
  position: relative;
}
.back img {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -11px;
  transform: translateY(50%);
}
</style>