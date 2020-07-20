<template>
  <div class="cate-gory">
    <nav-bar class="nav-bar">
      <div slot="middle">商品分类</div>
    </nav-bar>
    <category-menu
      :categoryTitles="categoryTitles"
      @menuClick="menuClick"
    ></category-menu>
    <div class="content">
      <scroll
        class="scroll"
        :probeType="0"
        :pullUpLoad="true"
        ref="scroll"
        @scroll="contentScroll"
      >
        <category-detail :categoryItems="categoryItems"></category-detail>
        <tab-control
          :titles="['综合', '销量', '新品']"
          @controlClick="controlClick"
          ref="tabControl"
        ></tab-control>
        <goods-list :goodsList="goods[currentType].list"></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CategoryMenu from './CategoryMenu'
import CategoryDetail from './CategoryDetail'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import { backTopMixin } from 'common/mixin'
import { debounce } from 'common/util'

import { getCategory, getSubcategory, getCategoryDetail } from 'network/category';

export default {
  name: 'Category',
  mixins: [backTopMixin],
  components: {
    Scroll,
    NavBar,
    CategoryMenu,
    CategoryDetail,
    TabControl,
    GoodsList
  },
  data() {
    return {
      categoryTitles: [],
      maitKeys: [],
      categoryItems: [],
      miniWallkeys: [],
      goods: {
        'pop': { list: [] },
        'new': { list: [] },
        'sell': { list: [] }
      },
      currentType: 'pop'
    }
  },
  methods: {
    contentScroll(positon) {
      this.isShowBackTop = -positon.y > 1000
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
    },
    menuClick(index) {
      this.getItemDetail(this.maitKeys[index], this.miniWallkeys[index])
    },
    // 请求左侧菜单栏的数据
    getCategory() {
      return getCategory().then(res => {
        res.data.category.list.forEach(item => {
          this.categoryTitles.push(item.title)
          this.maitKeys.push(item.maitKey)
          this.miniWallkeys.push(item.miniWallkey)
        })
      })
    },
    // 请求右侧分类数据
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then(res => {
        this.categoryItems = res.data.list
      })
    },
    // 请求对应分类的商品数据
    getCategoryDetail(miniWallkey, type) {
      // console.log(miniWallkey, type)
      getCategoryDetail(miniWallkey, type).then(res => {
        this.goods[type].list = this.goods[type].list.splice()
        res.forEach(item => {
          this.goods[type].list.push(item)
        })
      })
    },

    getDetail(miniWallkey) {
      // 请求对应的商品数据
      this.getCategoryDetail(miniWallkey, 'pop')
      this.getCategoryDetail(miniWallkey, 'new')
      this.getCategoryDetail(miniWallkey, 'sell')
    },
    getItemDetail(maitKey, miniWallkey) {
      // 请求item的数据
      this.getSubcategory(maitKey)
      // 请求对应的商品数据
      this.getDetail(miniWallkey)
      // this.$refs.scroll.refresh()
    }
  },
  created() {
    // 请求第一个item数据
    this.getCategory().then(res => {
      //请求第一个item的数据和对应的商品数据
      this.getItemDetail(this.maitKeys[0], this.miniWallkeys[0])
      // this.$refs.scroll.refresh()
    })
  },
  updated() {
    this.$refs.scroll.refresh()
  },
  activated() {
    // console.log('activated');
    this.$refs.scroll.refresh()
  }
}

</script>
<style scoped>
.cate-gory {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  color: aliceblue;
  /* position: fixed; */
  width: 100%;
  z-index: 9;
}

.content {
  position: absolute;
  left: 100px;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
.scroll {
  height: 100%;
}
</style>