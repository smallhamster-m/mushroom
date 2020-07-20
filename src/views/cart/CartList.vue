<template>
  <div class="cart-list">
    <cart-item
      v-for="(item, index) in cartList"
      :key="index"
      :itemInfo="item"
    ></cart-item>
  </div>
</template>

<script>
import CartItem from './CartItem'


export default {
  name: 'CartList',
  components: {
    CartItem
  },
  props: {
    cartList: {
      type: Array,
      default: []
    }
  }
}

</script>
<style scoped>
</style>