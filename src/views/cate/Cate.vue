<template>
  <div id="cate">
    <CateBar class="cate-bar">
      <div slot="left">
        <span>分类</span>
      </div>
      <div slot="center">
        <mt-search
          autofocus
          v-model="value"
          @keyup.enter.native="getSearchResult(value)">
        </mt-search>
        <mt-search v-model="value"></mt-search>
      </div>
    </CateBar>
    <div class="cate-wrap">
      <Scroller class="content" :probe-type="3" ref="scroll">
        <CateSideBar :titles="['上衣','裤子','裙子','内衣','女鞋','包包','运动','配饰','美妆','个护','家具','电子','装饰']" @cate-bar-click="cateBarClick"></CateSideBar>
      </Scroller>
    </div>
    <div class="cate-wrap1">
      <Scroller class="content1" :probe-type="3" ref="scroll1" :pull-up-load="true" @pull-up-load="pullUpLoad" @scroll-position="scrollPosition">
        <CateViewList :cateTypeList="showTypeList"/>
      </Scroller>
    </div>
  </div>
</template>

<script>
/*公共组件*/
import CateBar from "components/navigationbar/Navigationbar"
import Scroller from "components/scroller/Scroller"

/*子组件*/
import CateSideBar from "views/cate/childcmps/CateSideBar"
import CateViewList from "views/cate/childcmps/CateViewList"

/*网络请求*/
import {getCateListData} from 'network/cate'

export default {
  name: "Cate",
  data(){
    return{
      busRefresh:null,
      currenttype:'pop',
      value:'',
      catelist: {
        pop:{
          page:0,list:[]
        },
        new:{
          page:0,list:[]
        },
        sell:{
          page:0,list:[]
        }
      }
    }
  },
  created() {
    this.getPop("pop")
    this.getPop("new")
    this.getPop("sell")
  },
  mounted() {
    this.busRefresh = ()=>{
      if(this.$refs.scroll1){
        this.$refs.scroll1.refresh()
      }
    }
    this.$bus.$on("item-image-load2", this.busRefresh)
  },
  computed:{
    showTypeList(){
      return this.catelist[this.currenttype].list
    }
  },
  components:{
    CateBar,
    Scroller,
    CateSideBar,
    CateViewList
  },
  methods:{
    getSearchResult(value){
      this.$toast({
        message: value
      })
    },
    getPop(type){
      const page = this.catelist[type].page + 1
      getCateListData(type,page).then(res=>{
        this.catelist[type].list.push(...res.data.list)
        /*首次下来加载一次后，执行finishPullUp(),这样继续下来到底部才能循环pullingUp*/

        this.$refs.scroll1.finish()
        //this.$refs.scroll.finish();
      })
    },
    cateBarClick(index){
      switch (index){
        case 0:
          this.currenttype = "pop"
          break;
        case 1:
          this.currenttype = "new"
          break;
        case 2:
          this.currenttype = "sell"
          break;
      }
    },
    scrollPosition(pos){
      console.log(pos)
    },
    pullUpLoad(){
      this.getPop(this.currenttype)
    }
  }
}
</script>

<style scoped lang="less">
  #cate{
    height: 100vh;
    position: relative;
  }
  .cate-wrap,.cate-wrap1{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
    overflow: hidden;
  }
  .cate-wrap1{
    left: 26%;
  }
  .cate-wrap{
    width: 26%;
  }
  .cate-wrap1{
    width: 74%;
  }
  .cate-bar{
    background-color: hotpink;
    color: #ffffff;
    font-weight: 500;
  }
  .content,.content1{
    width: 100%;
    height: 100%;
  }
</style>
