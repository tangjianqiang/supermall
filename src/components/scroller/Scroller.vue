<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "scroller",
  data() {
    return {
      scroller:null
    }
  },
  //接收父组件来的值
  props:{
    probeType:{
      type:Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
    this.scroller = new BScroll(this.$refs.wrapper, {
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
      click:true
    })
    /*监听scroll*/
    if(this.probeType != 1 && this.probeType != 2){
      this.scroller.on("scroll",(position)=>{
        this.$emit("scroll-position",position)
      })
    }
    /*监听上拉加载*/
    if(this.pullUpLoad){
      this.scroller.on("pullingUp",()=>{
        this.$emit("pull-up-load")
      })
    }
  },
  methods:{
    refresh(){
      this.scroller && this.scroller.refresh() //重新计算
    },
    backTop(x,y,s=500){ //s在没有传值的情况，默认赋值500
      this.scroller && this.scroller.scrollTo(x,y,s)
    },
    scrollY(){
      return this.scroller.y
    },
    finish(){
      this.scroller && this.scroller.finishPullUp()  //循环无限加载
    }
  }
}
</script>

<style scoped>

</style>
