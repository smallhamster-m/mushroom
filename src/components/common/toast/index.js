import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 创建 组件 实例，并挂载到一个元素上
  const toast = new toastContrustor()
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast

}

export default obj

// import Toast from './Toast'

// const obj = {}
// obj.install = function(Vue) {
//   // 1.创建组件构造器
//   const toastContrustor = Vue.extend(Toast)

//   // 2.创建组件对象
//   const toast = new toastContrustor()

//   // 3.将组件对象，手动挂载到某一个元素上
//   toast.$mount(document.createElement('div'))

//   document.body.appendChild(toast.$el)

//   Vue.prototype.$toast = toast

// }

// export default obj