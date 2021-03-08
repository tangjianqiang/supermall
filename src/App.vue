<template>
  <div id="app">
    <keep-alive exclude="Details">
      <router-view></router-view>
    </keep-alive>
    <div class="wrap-container">
      <Tabbar v-if="$route.meta.tabbarshow">
        <TabbarItem path="/home" fontColor="#d81e06">
          <img slot="item-img" src="~assets/img/home.svg">
          <img slot="item-img-active" src="~assets/img/home-active.svg" alt="">
          <div slot="item-text">首页</div>
        </TabbarItem>
        <TabbarItem path="/cate" fontColor="#d81e06">
          <img slot="item-img" src="~assets/img/cate.svg">
          <img slot="item-img-active" src="~assets/img/cate-active.svg" alt="">
          <div slot="item-text">分类</div>
        </TabbarItem>
        <TabbarItem path="/cart" fontColor="#d81e06">
          <img slot="item-img" src="~assets/img/cart.svg">
          <img slot="item-img-active" src="~assets/img/cart-active.svg" alt="">
          <div slot="item-text">购物车</div>
        </TabbarItem>
        <TabbarItem path="/user" fontColor="#d81e06">
          <img slot="item-img" src="~assets/img/user.svg">
          <img slot="item-img-active" src="~assets/img/user-active.svg" alt="">
          <div slot="item-text">我的</div>
        </TabbarItem>
      </Tabbar>
    </div>
  </div>
</template>
<script>
import Tabbar from "components/tabbar/Tabbar";
import TabbarItem from "components/tabbar/TabbarItem";

export default {
  name: 'App',
  created() {
    //在页面刷新加载时读取sessionStorage里的数据信息
    if(window.sessionStorage.getItem("store")){
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(window.sessionStorage.getItem("store"))))
    }
    //在页面关闭/刷新后保存数据信息到sessionStorage里面
    window.addEventListener("beforeunload",()=>{
      window.sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    },false)
  },
  components:{
    Tabbar,
    TabbarItem
  },
  methods:{}
}
</script>

<style>
@import url("assets/css/base.less");
</style>
