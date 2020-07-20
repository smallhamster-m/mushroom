<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>

export default {
  name: 'BackTop',
  methods: {

  }
}

</script>
<style scoped>
.back-top {
  position: fixed;
  right: 15px;
  bottom: 60px;
  z-index: 9;
}
.back-top img {
  width: 45px;
  height: 45px;
}
</style>