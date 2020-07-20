<template>
  <div class="">
    <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :stop-propagation="false">
      <van-swipe-item v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad"/>
        </a>
      </van-swipe-item>
    </van-swipe> -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="#f69"
      :stop-propagation="false"
   
    >
      <slot></slot>
     
    </van-swipe>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe } from 'vant';

Vue.use(Swipe);

export default {
  name: 'Swipe'
 

}

</script>
<style scoped>

</style>