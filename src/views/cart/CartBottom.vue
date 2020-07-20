<template>
  <div class="cart-bottom">
    <div class="bottom-left">
      <check-button
        class="check"
        @click.native="allClick"
        :isChecked="isSelectAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="bottom-center">合计： ￥{{ totalPrice }}</div>
    <div class="bottom-right">去结算({{ buyCount }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {

  name: 'CartBottom',
  components: {
    CheckButton
  },
  computed: {
    //合计
    totalPrice() {
      return this.$store.state.cartList.filter(item => item.checkState)
        .reduce((preValue, item) => preValue + item.count * item.price, 0)
        .toFixed(2)
    },
    // 要结算的商品的数量
    buyCount() {
      return this.$store.state.cartList.filter(item => item.checkState).length
    },
    // 是否全选
    isSelectAll() {
      return this.$store.state.cartList.length === 0 ? false : this.$store.state.cartList.length === this.$store.state.cartList.filter(item => item.checkState).length
    }
  },
  methods: {
    allClick() {
      if (this.isSelectAll) {//此时为全选状态，点击后，把购物车里所有商品的 checkState 改为不选中状态
        // this.$store.state.cartList.forEach(item => {
        //   item.checkState = false
        // })
        this.$store.commit('noSelectAll')
      } else {//此时为非全选状态，点击后，把购物车里所有商品的 checkState 改为选中状态
        // this.$store.state.cartList.forEach(item => {
        //   item.checkState = true
        // })
        this.$store.commit('yesSelectAll')
      }
    }
  }
}

</script>
<style scoped>
.cart-bottom {
  height: 40px;
  width: 100%;
  background-color: #eee;
  display: flex;
  position: absolute;
  bottom: 49px;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
.bottom-left {
  width: 80px;
  display: flex;
  justify-content: center;

  /* border-right: 1px solid #ccc */
}
.bottom-left .check {
  line-height: 40px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}
.bottom-left img {
  vertical-align: bottom;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  /* background-color: red; */
}
.bottom-center {
  flex: 1;
}

.bottom-right {
  width: 90px;
  background-color: var(--color-tint);
  color: #fff;
  border-radius: 10px;
}
</style>