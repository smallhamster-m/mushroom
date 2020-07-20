<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <div class="item-img"><slot name="img"></slot></div>
    </div>
    <div v-else>
      <div class="item-img-active"><slot name="img-active"></slot></div>
    </div>
    <!-- <div class="item-text" :class="{activeColor: isActive}"><slot name="text"></slot></div> -->
    <div class="item-text" :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>

export default {
  name: 'TabBarItem',
  data() {
    return {
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  props: {
    path: {
      type: String,
      default: '/home'
    },
    activeColor: { 
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch((err) => err)
    }
  }
}

</script>
<style scoped>
.tab-bar-item {
  /* display: flex; */
  flex: 1;
}
.item-img img,
.item-img-active img {
  margin: 3px auto;
  display: block;
  /* background-color: #fff; */
  height: 24px;
  width: 24px;
}
.item-text {
  font-size: 14px;
  text-align: center;
}
</style>