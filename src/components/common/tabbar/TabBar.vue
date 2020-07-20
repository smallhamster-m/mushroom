<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'TabBar',
}

</script>
<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  height: 49px;
  background-color: #eee;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, .3);
}
</style>