<template>
  <div class="detail">
    <detail-nav-bar
      ref="nav"
      class="detail-nav-bar"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll
      :probeType="0"
      :pullUpLoad="true"
      class="content"
      ref="scroll"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!-- <swipe :banner='topImages'></swipe> -->
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <detail-recommend-info></detail-recommend-info>
      <goods-list ref="goods" :goodsList="recommendList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <deatil-bottom-bar @addCart="addToCart"></deatil-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './DetailNavBar'
import DetailSwiper from './DetailSwiper'
import DetailBaseInfo from './DetailBaseInfo'
import DetailShop from './DetailShop'
import DetailGoodsInfo from './DetailGoodsInfo'
import DetailParamInfo from './DetailParamInfo'
import DetailCommentInfo from './DetailCommentInfo'
import DetailRecommendInfo from './DetailRecommendInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DeatilBottomBar from './DeatilBottomBar'
import Scroll from 'components/common/scroll/Scroll'


import { backTopMixin } from 'common/mixin'
import { debounce } from 'common/util'
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
import { mapActions } from 'vuex';

export default {
  name: 'Detail',
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    GoodsList,
    DeatilBottomBar,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      TopYs: [],
      message: '',
      isShow: false
    }
  },
  created() {
    this.iid = this.$route.params.iid
    // 获取详请数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 请求轮播图的图片
      this.topImages = data.itemInfo.topImages
      // 获取商品GoodInfo数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取店铺信息Shop
      this.shop = new Shop(data.shopInfo)
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //  
      // this.commentInfo = data.rate.list[0]
      this.commentInfo = data.rate.list ? data.rate.list[0] : {}
    })
    // 获取推荐商品数据
    getRecommend().then(res => {
      this.recommendList = res.data.list
      // console.log(this.recommendList)
    })
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
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.TopYs[0] = 0
      this.TopYs[1] = this.$refs.param.$el.offsetTop - 44
      this.TopYs[2] = this.$refs.comment.$el.offsetTop - 44
      this.TopYs[3] = this.$refs.goods.$el.offsetTop - 44
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.TopYs[index], 0)
    },
    contentScroll(positon) {
      // 返回顶部按钮是否显示
      this.isShowBackTop = -positon.y > 1000
      // 滚动到对应位置，对应的title变色
      if (-positon.y <= 0 || (-positon.y >= this.TopYs[0] && -positon.y < this.TopYs[1])) {
        this.$refs.nav.currentIndex = 0
      } else if (-positon.y >= this.TopYs[1] && -positon.y < this.TopYs[2]) {
        this.$refs.nav.currentIndex = 1
      } else if (-positon.y >= this.TopYs[2] && -positon.y < this.TopYs[3]) {
        this.$refs.nav.currentIndex = 2
      } else {
        this.$refs.nav.currentIndex = 3
      }
    },
    addToCart() {
      console.log('===')
      // 整合要添加到购物车的商品的信息
      const product = {}
      product.title = this.goods.title
      product.image = this.topImages[0]
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      product.checkState = false
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   this.message = res
      //   this.isShow = true
      //   setTimeout(() => {
      //     this.message = ''
      //     this.isShow = false
      //   }, 1000)
      // })
      this.addCart(product).then(res => {//映射
        this.$toast.show(res, 2000)
        // console.log(this.$toast)
      })

    }
  }
}

</script>
<style scoped>
.detail-nav-bar {
  background-color: #fff;
  position: relative;
  z-index: 9;
}
.detail {
  position: relative;
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
</style>