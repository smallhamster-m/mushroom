<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="img" src="~assets/img/tabbar/home.svg" alt="" />
        <img
          slot="img-active"
          src="~assets/img/tabbar/home_active.svg"
          alt=""
        />
        <div slot="text">首页</div>
      </tab-bar-item>
      <!-- activeColor为当前活跃字体的颜色，默认为red -->
      <tab-bar-item path="/category" activeColor="#ff5777">
        <img slot="img" src="~assets/img/tabbar/category.svg" alt="" />
        <img
          slot="img-active"
          src="~assets/img/tabbar/category_active.svg"
          alt=""
        />
        <div slot="text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="#ff5777">
        <img slot="img" src="~assets/img/tabbar/shopcart.svg" alt="" />
        <img
          slot="img-active"
          src="~assets/img/tabbar/shopcart_active.svg"
          alt=""
        />
        <div slot="text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="#ff5777">
        <img slot="img" src="~assets/img/tabbar/profile.svg" alt="" />
        <img
          slot="img-active"
          src="~assets/img/tabbar/profile_active.svg"
          alt=""
        />
        <div slot="text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem from "components/common/tabbar/TabBarItem"

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}

</script>
<style scoped>
</style>