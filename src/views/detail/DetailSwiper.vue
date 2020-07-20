<template>
  <div class="">
    <swipe class="my-swipe">
      <van-swipe-item v-for="item in topImages" class="">    
          <img :src="item" alt=""/>
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
  name: 'DetailSwiper',
  components: {
    Swipe
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}

</script>
<style scoped>
.my-swipe .van-swipe-item {
height: 300px;
 /* width: 100%; */
overflow: hidden;

}
.my-swipe .van-swipe-item img {
  width: 100%;
}
</style>