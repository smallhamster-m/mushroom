<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="middle">购物车({{ cartListLength }})</div>
    </nav-bar>
    <scroll class="scroll" ref="scroll" :pullUpLoad="true">
      <cart-list class="cart-list" :cartList="cartList"></cart-list>
    </scroll>
    <cart-bottom :cartListLength="cartListLength" ></cart-bottom>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import CartList from './CartList'
import CartBottom from './CartBottom'
export default {
  name: 'Cart',
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottom
  },
  computed: {
    cartList() {
      return this.$store.state.cartList
    },
    cartListLength() {
      return this.$store.state.cartList.length
    }
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}

</script>
<style scoped>
.cart {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.scroll {
  position: absolute;
  width: 100%;
  top: 44px;
  bottom: 89px;
  overflow: hidden;
}
</style>