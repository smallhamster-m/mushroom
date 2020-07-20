<template>
  <div class="goods-list">
    <goods-item v-for="item in goodsList" :goods-item="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsItem
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}

</script>
<style scoped>
.goods-list {
  margin: 0 2px;
  display: flex;
  flex-wrap: wrap; /* 让弹性盒元素在必要的时候拆行： */
  justify-content: space-around;
  /* height: 10000px; */
}
</style>