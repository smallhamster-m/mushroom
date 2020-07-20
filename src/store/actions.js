export default {
  // 添加购物车的操作
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      const result = context.state.cartList.find(item =>
        item.iid === payload.iid
      )
      if (result) {//mutations里的每个方法最好只做一件事情
        context.commit('addCounter', result)
        resolve('当前商品数量+1')
      } else {
        context.commit('addToCart', payload)
        resolve('添加购物车成功')
      }
    })

  }
}