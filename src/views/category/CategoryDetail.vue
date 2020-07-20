<template>
  <div class="category-detail">
    <div class="category-item" v-for="(item, index) in categoryItems">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CategoryDetail',
  props: {
    categoryItems: {
      type: Array,
      default() {
        return []
      }
    }
  }
}

</script>
<style scoped>
.category-detail {
  display: flex;
  /*  让弹性盒子在必要的时候换行*/
  flex-wrap: wrap;
  /* align-content: center; */
  padding: 10px 5px;
}
.category-item {
  width: 33.33%;
  height: 80px;
  /* margin: 5px 0; */
  padding: 5px;
  /* overflow: hidden; */
}
.category-item a {
  display: block;
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 12px;
}
.category-item img {
  width: 75%;
  /* margin-bottom: 5px; */
}
</style>