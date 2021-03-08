<template>
  <div class="detail-bar">
    <div class="bar-left">
      <div class="bar-left-customer">
        <span class="cust-img"></span>
        <span class="cust-title">客服</span>
      </div>
      <div class="bar-left-shoper">
        <span class="shop-img"></span>
        <span class="shop-title">店铺</span>
      </div>
      <div class="bar-left-collect">
        <span class="collect-img"></span>
        <span class="collect-title">收藏</span>
      </div>
    </div>
    <div class="bar-center" @click="addShopCart">
      <span>加入购物车</span>
    </div>
    <div class="bar-right" @click="pathToCart">
      <span>购买</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailNavBar",
  methods:{
    addShopCart(){
      this.$emit('shop-enter-cart')
    },
    pathToCart(){
      this.$router.push("/cart")
    }
  }
}
</script>

<style scoped lang="less">
  .detail-bar{
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;
    display: flex;
  }
  .bar-left{
    width: 50%;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  .bar-left .bar-left-customer,.bar-left .bar-left-shoper,.bar-left .bar-left-collect{
    flex: 1;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
  }
  .bar-left-customer .cust-img,.bar-left-shoper .shop-img,.bar-left-collect .collect-img{
    display: block;
    width: 26px;
    height: 26px;
    margin: 0 auto 2px;
  }
  .bar-left-customer .cust-img{
    background:url("~assets/img/common/detail_bottom.png") no-repeat 0 -61px/26px 26px;
    background-size: 100%;
  }
  .bar-left-shoper .shop-img{
    background:url("~assets/img/common/detail_bottom.png") no-repeat 0 -113px/26px 26px;
    background-size: 100%;
  }
  .bar-left-collect .collect-img{
    background:url("~assets/img/common/detail_bottom.png") no-repeat 0 3px/26px 26px;
    background-size: 100%;
  }
  .bar-center,.bar-right{
    width: 25%;
    line-height: 49px;
    text-align: center;
    font-size: 16px;
    color:#ffffff;
  }
  .bar-center{
    background-color: darkorange;
  }
  .bar-right{
    background-color: hotpink;
  }
</style>
