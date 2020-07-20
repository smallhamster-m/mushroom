export default {
  // 购物车数量加1
  addCounter(state, payload) {
    payload.count += 1
  },
  // 第一次添加购物车
  addToCart(state, payload) {
    payload.count = 1
    state.cartList.push(payload)
  },
  // 选中按钮修改对应商品的选中状态
  checkClick(state, payload) {
    payload.checkState = !payload.checkState
  },
  // 全不选
  noSelectAll(state) {
    state.cartList.forEach(item => {
      item.checkState = false
    })
  },
  // 全选
  yesSelectAll(state) {
    state.cartList.forEach(item => {
      item.checkState = true
    })
  }
}