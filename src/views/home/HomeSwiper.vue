<template>
  <div class="home-swipe">
    <swipe class="my-swipe">
      <van-swipe-item v-for="item in banner" class="">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad" />
        </a>
      </van-swipe-item>
    </swipe>
  </div>
</template>

<script>
import Swipe from 'components/content/swipe/Swipe'

import Vue from 'vue';
import { SwipeItem } from 'vant';
Vue.use(SwipeItem);

export default {
  name: 'HomeSwiper',
  components: {
    Swipe
  },
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit('imgLoad')
    }
  }
}

</script>
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
  width: 375px;
  height: 195px;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
}
</style>