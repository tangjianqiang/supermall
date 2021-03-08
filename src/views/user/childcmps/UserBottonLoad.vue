<template>
  <div class="user-load">
    <div class="load-shop" @click="GoShopCart">
      <span>
        <img src="~assets/img/common/shopcart.svg" alt="">
      </span>
      <span>我的购物车</span>
    </div>
    <div class="load-down">
      <span>
        <img src="~assets/img/common/download.svg" alt="">
      </span>
      <span>下载购物APP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBottonLoad",
  methods:{
    GoShopCart(){
      this.$emit('go-shop-cart')
    }
  }
}
</script>

<style scoped lang="less">
  .user-load{
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .user-load div{
    flex: 1;
    line-height: 45px;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .user-load div img{
    width: 20px;
    vertical-align: middle;
    padding-left: 10px;
  }
  .user-load div span{
    display: block;
    line-height: 45px;
    color: #2c3e50;
    font-size: 15px;
  }
  .user-load div span:nth-child(1){
    width: 10%;
  }
  .user-load div span:nth-child(2){
    width: 90%;
  }
</style>
