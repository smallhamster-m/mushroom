<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="middle">蘑菇街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @controlClick="controlClick"
      ref="tabControl1"
      v-show="isShowControl"
    ></tab-control>
    <scroll 
      class="content"
      :probeType="0"
      :pullUpLoad="true"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- <swipe :banner="banner" @imgLoad="imgLoad"></swipe> -->
      <home-swiper :banner="banner" @imgLoad="imgLoad"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-feature></home-feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @controlClick="controlClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goodsList="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import { request } from 'network/request'
// import Swipe from 'components/content/swipe/Swipe'
import HomeSwiper from './HomeSwiper'
import HomeRecommend from './HomeRecommend'
import HomeFeature from './HomeFeature'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import { debounce } from 'common/util'
import {backTopMixin} from 'common/mixin'

export default {
  name: 'Home',
  mixins: [backTopMixin],
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      count: 0,
      isShowControl: false,
      tabOffsetTop: 0,
      currentPosition: 0
    }
  },
  components: {
    NavBar,
    // Swipe,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {


    // 使用防抖函数，避免频繁调用刷新函数
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('itemImgLoad', () => {
      refresh()
    })
    // 这样调用refresh太频繁
    //  this.$bus.$on('itemImgLoad', () => { 
    //   this.$refs.scroll.refresh()
    // })

  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.currentPosition, 0)
  },
  deactivated() {
    this.currentPosition = this.$refs.scroll.getScrollY()
    console.log(this.currentPosition)
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      getHomeGoods(type, this.goods[type].page + 1).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
        // console.log(res)
      })
    },
    controlClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
   
    contentScroll(positon) {
      this.isShowBackTop = -positon.y > 1000
      this.isShowControl = -positon.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp();
      // console.log('加载更多')
    },
    imgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}

</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  color: aliceblue;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>