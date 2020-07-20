<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'


export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: { //决定是否监听滚动
      type: Number,
      default: 0
    },
    pullUpLoad: {//决定是否监听上拉操作
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)

    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      console.log('refresh')
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted() {
    // 注册插件
    BScroll.use(Pullup)
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 以下两个配置项根据需要在父组件中通过props传对应的值过来
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })


  }
  // updated() {
  //   this.scroll.refresh()
  //   // 重新计算content高度。这样才能正常滚动
  //   console.log('updated')
  // }
}

</script>
<style scoped>
</style>