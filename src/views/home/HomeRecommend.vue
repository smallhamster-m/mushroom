<template>
  <div class="home-recommend">
    <div class="recommend-item" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeRecommend',
  props: {
    recommend: {
      type: Array
    }
  }
}

</script>
<style scoped>
.home-recommend {
  display: flex;
  /* max-width: 100%; */
 justify-content: space-around;
 border-top: 10px solid #eee;
 border-bottom: 10px solid #eee;
 padding-bottom: 10px;
}
.recommend-item {
  /* flex: 1; */
  text-align: center;
  font-size: 12px;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin: 10px 0;
}
</style>