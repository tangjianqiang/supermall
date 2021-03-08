<template>
  <div id="home">
    <Navbar class="home-navbar"><div slot="center">购物街</div></Navbar>
    <Homebar :titles="['流行','新款','精选']" ref="bar" @home-bar-click="homeBarClick" v-show="isFixed"/>
    <!-- 这里的3和true为数字和Boolean 前面必须加:，不加为字符串，子组件中已指定类型-->
    <Scroller class="content" :probe-type="3" :pull-up-load="true" ref="scroll" @pull-up-load="pullUpLoad" @scroll-position="scrollPosition">
      <Swipe :swipedata="banner" @swiper-img-load="swiperImgLoad"/>
      <Recommend :recommend="recommend"/>
      <Pop :pop="pop"/>
      <Homebar :titles="['流行','新款','精选']" ref="bar1" @home-bar-click="homeBarClick"/>
      <HomeViewList :homeTypelist="showTypeList"/>
    </Scroller>
    <Backtop @click.native="backTop" v-show="isBackShow"/>
  </div>
</template>

<script>
/*公共组件*/
import Navbar from "components/navigationbar/Navigationbar"
import Scroller from "components/scroller/Scroller"
import Backtop from "components/backtop/Backtop"

/*子组件*/
import Swipe from "views/home/childcmps/HomeSwiper"
import Recommend from "views/home/childcmps/HomeRecommend"
import Pop from "views/home/childcmps/HomePop"
import Homebar from "views/home/childcmps/Homebar"
import HomeViewList from "views/home/childcmps/HomeViewList"

/*网络请求*/
import {getHomeMultidata,getHomeListData} from 'network/home'
/*mixin混入*/
import {itemListerMixin} from 'assets/common/mixin'


export default {
  name: "Home",
  mixins: [itemListerMixin],
  data(){
    return{
      banner:[],
      recommend:[],
      currenttype:'pop',
      homelist: {
        pop:{
          page:0,list:[]
        },
        new:{
          page:0,list:[]
        },
        sell:{
          page:0,list:[]
        }
      },
      pop:[
        {
          link:"http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          sort:1,
          image:"https://s10.mogucdn.com/mlcdn/c45406/200115_1dgli62l42hlcda1a1ag55i4l8ie1_172x172.jpg",
          title:"时尚套装"
        },
        {
          link:"http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          sort:2,
          image:"https://s10.mogucdn.com/mlcdn/c45406/181031_20c98cekk381c5i3ladb506e8g290_172x172.png",
          title:"百搭卫衣"
        },
        {
          link:"http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          sort:3,
          image:"https://s10.mogucdn.com/mlcdn/c45406/190306_6ffi2507dhdicfkj3fcf528aki8ad_224x224.png",
          title:"短款外套"
        },
        {
          link:"http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          sort:4,
          image:"https://s10.mogucdn.com/mlcdn/c45406/190908_4ac7i9ea448ej5j16eeh2gfii7hi6_224x224.png",
          title:"牛仔潮裤"
        },
        {
          link:"http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          sort:5,
          image:"https://s10.mogucdn.com/mlcdn/c45406/200309_27g7f601d0icj1aa21llkgj74kg17_224x224.png",
          title:"家具精选"
        },
        {
          link:"http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          sort:6,
          image:"https://s10.mogucdn.com/mlcdn/c45406/181203_63cg95db7ifbg8e0aj2bfai3ga325_172x172.png",
          title:"连体衣裙"
        },
        {
          link:"http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          sort:7,
          image:"https://s10.mogucdn.com/mlcdn/c45406/200309_86i0e6f5550gl94d8fh8j824fcj9h_224x224.png",
          title:"人气跑鞋"
        },
        {
          link:"http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          sort:8,
          image:"https://s10.mogucdn.com/mlcdn/c45406/200309_6f03f5511fl8k9ccbh24jh956ld4c_224x224.png",
          title:"品牌包包"
        }
      ],/*本周流行没有接口数据，这里用本地数据*/
      offsetTop:0,
      isFixed:false,
      activeY:0,
      busRefresh:null,
      popPosition:0,
      newPosition:0,
      sellPosition:0
    }
  },
  created(){
    this.getHomeMultidata()

    this.getPop("pop")
    this.getPop("new")
    this.getPop("sell")
  },
  computed:{
    showTypeList(){
      return this.homelist[this.currenttype].list
    }
  },
  mounted() {
    this.busRefresh = ()=>{
      if(this.$refs.scroll){
        this.$refs.scroll.refresh()
      }
    }
    this.$bus.$on("item-image-load1", this.busRefresh)
  },
  activated() {
    this.$refs.scroll.backTop(0,this.activeY,1000)
    //console.log(111222333)
    //
    //this.$refs.scroll.refresh()
  },
  deactivated() {
    this.activeY = this.$refs.scroll.scrollY()
    /*离开当前页面移除事件总线*/
    //this.$bus.$off("item-image-load",this.busRefresh)
  },
  watch:{
    currenttype(newValue,oldValue){
      console.log("newValue",newValue)
      console.log("oldValue",oldValue)
    }
  },
  components:{
    Navbar,
    Scroller,
    Backtop,
    Swipe,
    Recommend,
    Homebar,
    Pop,
    HomeViewList
  },
  methods:{
    /*aixos获取首页列表数据*/
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        console.log(res);
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getPop(type){
      const page = this.homelist[type].page + 1
      getHomeListData(type,page).then(res=>{
        this.homelist[type].list.push(...res.data.list)

        /*首次下来加载一次后，执行finishPullUp(),这样继续下来到底部才能循环pullingUp*/
        this.$refs.scroll.finish();
      })
    },
    /*homebar绑定list*/
    homeBarClick(index){
      switch (index){
        case 0: this.currenttype = "pop"
        break;
        case 1: this.currenttype = "new"
        break;
        case 2: this.currenttype = "sell"
        break;
      }
      /*上下currentIndex始终保持一致*/
      this.$refs.bar.currentIndex = index
      this.$refs.bar1.currentIndex = index
    },
    /*计算swiper轮播图单张高度*/
    swiperImgLoad(){
      this.offsetTop = this.$refs.bar1.$el.offsetTop
    },
    /*返回顶部和homebar置顶*/
    scrollPosition(pos){
      console.log(pos)
      /*homebar置顶计算*/
      this.isFixed = -pos.y > this.offsetTop
      /*返回顶部计算*/
      this.isBackShow = -pos.y > 1000
    },
    pullUpLoad(){
      this.getPop(this.currenttype)
    }
  }
}
</script>

<style scoped lang="less">
  #home{
    height: 100vh;
    position: relative;
  }
  .home-navbar{
    background-color: hotpink;
    color: #fff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
