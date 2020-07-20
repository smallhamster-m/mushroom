<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="middle"><slot name="middle"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
}

</script>
<style scoped>
.nav-bar {
  height: 44px;
  line-height: 44px;
  display: flex;
}
.nav-bar .left,
.nav-bar .right {
  width: 50px;
  text-align: center;
  /* background-color: red; */
}
.nav-bar .middle {
  flex: 1;
  text-align: center;
 
}
</style>