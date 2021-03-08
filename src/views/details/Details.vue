<template>
  <div id="detail">
    <DetailBar class="detail-bar">
      <div slot="left" class="detail-bar-img" @click="btnBack"><img src="~assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="detail-bar-item">
         <div v-for="(item,index) in detailBar" :key="item" :class="{active:currentIndex === index}" @click="btnClick(index)">{{item}}</div>
      </div>
    </DetailBar>
    <Scroller class="content" :probe-type="3" ref="scroll" @scroll-position="scrollPosition">
<!--      {{$store.state.shopCart}}-->
      <DetailSwiper :topImage="topImage"/>
      <DetailTopPart :topPart="topPart"/>
      <DetailShopInfo :shopInfo="shopInfo"/>
      <DetailDecMsg :desMsg="desMsg"/>
      <DetailSize ref="size" :comSize="comSize"/>
      <DetailUserRate ref="rate" :userRate="userRate" :shopId="shopId"/>
      <DetailRecUsr ref="user" :recommendList="recommendList"/>
    </Scroller>
    <Backtop @click.native="backTop" v-show="isBackShow"/>
    <DetailNavBar @shop-enter-cart="shopEnterCart"/>
  </div>
</template>

<script>
/*公共组件*/
import DetailBar from "components/navigationbar/Navigationbar"
import Scroller from "components/scroller/Scroller"
import Backtop from "components/backtop/Backtop"

/*子组件*/
import DetailSwiper from "views/details/childcmps/DetailSwiper"
import DetailTopPart from "views/details/childcmps/DetailTopPart"
import DetailShopInfo from "views/details/childcmps/DetailShopInfo"
import DetailDecMsg from "views/details/childcmps/DetailDecMsg"
import DetailSize from "views/details/childcmps/DetailComSize"
import DetailUserRate from "views/details/childcmps/DetailUserRate"
import DetailRecUsr from "views/details/childcmps/DetailRecUsr"
import DetailNavBar from "views/details/childcmps/DetailNavBar"

/*网络请求*/
import {getDetailData,getDetailListData} from "network/detail"

/*mixin混入*/
import {itemListerMixin} from 'assets/common/mixin'

/*utils*/
import {debounce} from "assets/common/utils"

/*辅助方法*/
import { mapActions } from "vuex"

export default {
  name: "Details",
  mixins: [itemListerMixin],
  data(){
    return{
      currentIndex:0,
      busRefresh:null,
      getThemeTopY:null,
      lowNowPrice:0,
      shopId:'',
      detailBar:['商品','参数','评论','推荐'],
      postionTopY:[],
      topImage:[],
      topPart:{
        title:'',
        price:'',
        oldPrice:'',
        discountDesc:'',
        color:'',
        columns:[],
        services:[]
      },
      shopInfo:{
        shopLogo:'',
        name:'',
        cGoods:'',
        cSells:'',
        score:[],
        shopUrl:''
      },
      desMsg:{
        desc:'',
        key:'',
        list:[]
      },
      comSize:{
        rule:[],
        set:[]
      },
      userRate:[],
      recommendList:[]
    }
  },
  created() {
    /*detail数据*/
    this.getDetailData(this.$route.params.iid)
    /*detail推荐*/
    this.getDetailListData()
    /*debounce防抖*/
    this.shopDebounce()
  },
  mounted() {
    this.busRefresh = ()=>{
      if(this.$refs.scroll) {
        this.$refs.scroll.refresh()
        /*图片加载一次执行一次数组重新赋值*/
        this.getLinkAge()
      }
    }
    this.$bus.$on("item-image-load2", this.busRefresh)
  },
  destroyed() {
    console.log("destroyed")
    //this.$bus.$off("item-image-load", this.busRefresh)
  },
  watch:{
    $route:{
      handler(newValue,oldValue){
         this.detailPathPage(newValue.params.iid)
         console.log(newValue,oldValue)
      },
      deep:true
    }
  },
  components:{
    DetailBar,
    Scroller,
    Backtop,
    DetailSwiper,
    DetailTopPart,
    DetailShopInfo,
    DetailDecMsg,
    DetailSize,
    DetailUserRate,
    DetailRecUsr,
    DetailNavBar
  },
  methods:{
    ...mapActions(['addShopInfo']),
    btnBack(){
      this.$router.go(-1)
    },
    btnClick(index){
      this.$nextTick(()=>{
        this.currentIndex = index
        this.$refs.scroll.backTop(0,-this.postionTopY[index],200)
      })
    },
    scrollPosition(pos){
      /*返回顶部计算*/
      this.isBackShow = -pos.y > 1000
      /*
      * [0, 16508, 17440, 17650, 最大值]
      * 用pos的值和上面得到的值做比较，0-16508 为0，16508-17440 为1，17440-17650为2，大于或者等于17650为3
      * */
      for(let i in this.postionTopY){
        if(this.currentIndex !== parseFloat(i)-1 && (-pos.y >= this.postionTopY[parseFloat(i)-1] && -pos.y < this.postionTopY[parseFloat(i)])){
           this.currentIndex = parseFloat(i)-1
          console.log(parseFloat(i)-1)
        }
      }
    },
    shopDebounce(){
      /*防抖*/
      this.getThemeTopY = debounce(()=>{
        this.postionTopY = [0]
        this.postionTopY.push(this.$refs.size.$el.offsetTop)
        this.postionTopY.push(this.$refs.rate.$el.offsetTop)
        this.postionTopY.push(this.$refs.user.$el.offsetTop)
        this.postionTopY.push(Number.MAX_VALUE)
        console.log(this.postionTopY)
      },200)
    },
    getDetailData(iid){
      getDetailData(iid).then(res=>{
        this.shopId = res.iid
        console.log(res)

        /*数据重置*/
        this.topImage = []
        this.topPart = {}
        this.shopInfo = {}
        this.desMsg = {}
        this.comSize = {}
        this.userRate = []
        /*swiper*/
        this.topImage.push(...res.result.itemInfo.topImages)
        /*topPart*/
        this.topPart = {
          title: res.result.itemInfo.title,
          price: res.result.itemInfo.price,
          detailDesc: res.result.detailInfo.desc,
          lowNowPrice: res.result.itemInfo.lowNowPrice,
          oldPrice: res.result.itemInfo.oldPrice,
          discountDesc: res.result.itemInfo.discountDesc,
          color: res.result.itemInfo.discountBgColor,
          columns: [res.result.columns[0],res.result.columns[1],(res.result.shopInfo.services.filter((ob)=>{
            return ob.name == '72小时发货'
          }))[0].name],
          services:[res.result.shopInfo.services[0],res.result.shopInfo.services[1],res.result.shopInfo.services[2]]
        }
        /*shopInfo*/
        this.shopInfo = {
          shopLogo: res.result.shopInfo.shopLogo,
          name: res.result.shopInfo.name,
          cGoods: res.result.shopInfo.cGoods,
          cSells: res.result.shopInfo.cSells,
          score: [...res.result.shopInfo.score],
          shopUrl: res.result.shopInfo.shopUrl
        }
        /*DecMsg*/
        this.desMsg = {
          desc: res.result.itemInfo.desc,
          key: res.result.detailInfo.detailImage[0].key,
          list: [...res.result.detailInfo.detailImage[0].list]
        }
        /*comSize*/
        this.comSize = {
          rule: [...res.result.itemParams.rule.tables[0]],
          set: [...res.result.itemParams.info.set]
        }
        /*userRate*/
        if(res.result.rate.cRate > 0){ //有数据
          this.userRate = [...res.result.rate.list]
        }else{
          this.userRate = []
        }
      })
    },
    getDetailListData(){
      const randNum = Math.floor(Math.random() * 3)
      const listMenu = ['pop','new','sell']
      const page = 3
      getDetailListData(listMenu[randNum],6).then(res=>{
         console.log(res)
         this.recommendList = res.data.list
      })
    },
    detailPathPage(iid){
      /*详情页内部链接跳转到详情页*/
      this.getDetailData(iid)
      /*详情页推荐*/
      this.getDetailListData()
      /*index赋值默认*/
      this.currentIndex = 0
      /*回到顶部*/
      this.$refs.scroll.backTop(0,0,0)
    },
    shopEnterCart(){
       console.log(typeof(this.topPart.lowNowPrice))
       this.addShopInfo({
         shopId: this.shopId,   //iid
         decImage: this.topImage[0], //商品图
         decTitle: this.topPart.title,  //商品标题
         detailDesc: this.topPart.detailDesc,//商品描述
         shopPrice: this.topPart.lowNowPrice, //商品价格
         status: true, //默认选中
         num: 1
       }).then(res=>{
         this.$toast({
           message:res,
           duration:1000
         });
       })
    },
    getLinkAge(){
      this.getThemeTopY()
    }
  }
}
</script>

<style scoped lang="less">
 #detail{
   height: 100vh;
   position: relative;
 }
 .content{
   overflow: hidden;
   position: absolute;
   top: 44px;
   left: 0;
   right: 0;
   bottom: 49px;
   z-index: 11;
   background-color: #fff;
 }
 .detail-bar{
   color:#2c3e50;
   background-color: #ffffff;
 }
 .detail-bar-img img{
   margin-top: 11px;
 }
 .detail-bar-item{
   display: flex;
 }
 .detail-bar-item div{
   flex:1;
 }
 .detail-bar-item .active{
   color:hotpink;
 }
</style>
