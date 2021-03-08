<template>
  <div class="detail-banner">
    <div class="swiper-wrap">
      <mt-swipe :auto="4000" :prevent="true" refs="mt">
        <mt-swipe-item v-for="item in topImage" :key="item">
          <a href="javascript:;">
            <img v-lazy="item" @load="imageLoad" alt="">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailSwiper",
  data(){
    return{

    }
  },
  created() {
     console.log(this.topImage)
  },
  props:{
    topImage:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imageLoad(){
      /*事件总线*/
      this.$bus.$emit('item-image-load2')
    }
  }
}
</script>

<style scoped lang="less">
  .detail-banner{
    width: 100%;
    height: 465px;
    color: #fff;
    text-align: center;
    position: relative;
  }
  .swiper-wrap{
    height: 465px;
  }
  .detail-banner img{
    width: 100%;
    height: 465px;
  }
  .detail-banner a{
    display: block;
  }
</style>
