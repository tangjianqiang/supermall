<template>
   <div class="home-banner">
     <div class="swiper-wrap">
       <mt-swipe :auto="4000" :prevent="true" refs="mt">
         <mt-swipe-item v-for="item in swipedata" :key="item.acm">
           <a :href="item.link">
             <img :src="item.image" @load="imageLoad" alt="" ref="img">
           </a>
         </mt-swipe-item>
       </mt-swipe>
     </div>
   </div>
</template>

<script>
export default {
  name: "Banner",
  data(){
    return{
      isSwipe:false
    }
  },
  created() {
    console.log(111)
  },
  props:{
    swipedata:{
      type:Array,
      default(){
        return []
      }
    }
  },
  mounted() {
    //console.log(this.$refs.mt)
  },
  methods:{
    imageLoad(){
      if(!this.isSwipe){
        this.$emit("swiper-img-load")
        this.isSwipe = true
      }
      this.$bus.$emit('item-image-load1')  //中央事件总线所有图片load后，better-scroll重新计算高度
    }
  }
}
</script>

<style scoped lang="less">
  .home-banner{
    width: 100%;
    height: 195px;
    color: #fff;
    text-align: center;
    position: relative;
  }
  .swiper-wrap{
    height: 195px;
  }
  .home-banner img{
    height: 195px;
  }
  .home-banner a{
    display: block;
  }
</style>
