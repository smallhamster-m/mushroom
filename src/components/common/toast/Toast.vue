<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>

export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, time = 1500) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, time)
    }
  }
}

</script>
<style scoped>
.toast {
  background-color: rgba(0, 0, 0, 0.6);
  color: aliceblue;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 150px;
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  z-index: 99;
}
</style>