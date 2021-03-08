<template>
  <div class="detail-shop">
    <div class="shop-title">
      <img :src="shopInfo.shopLogo" @load="imageLoad" alt="">
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="shop-info">
      <div class="shop-volume">
         <div class="shop-num">
           <span class="item-s">
             <i>{{shopNumToFix}}</i><br>
             <em>总销量</em>
           </span>
           <span class="item-l">
             <i>{{shopGoodTofix}}</i><br>
             <em>总店铺</em>
           </span>
         </div>
         <div class="shop-all">
           <span class="item-t" v-for="item in shopInfo.score">
             {{item.name}}<i :class="{better:item.score >= 5,low:item.score <5}">{{item.score}}</i>
             <em v-if="item.score >= 5" :class="{bakbetter:item.score >= 5}">高</em>
             <em v-else :class="{baklow:item.score < 5}">低</em>
           </span>
         </div>
      </div>
      <div class="shop-tag"><a :href="shopInfo.shopUrl">进店逛逛</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  data(){
    return{
    }
  },
  props:{
    shopInfo:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    shopNumToFix(){
      return this.shopInfo.cSells > 10000 ? (this.shopInfo.cSells / 10000).toFixed(1) + '万' : this.shopInfo.cSells
    },
    shopGoodTofix(){
      return this.shopInfo.cGoods > 10000 ? (this.shopInfo.cGoods / 10000).toFixed(1) + '万' : this.shopInfo.cGoods
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
  .detail-shop{
    padding: 10px 6px;
    overflow: hidden;
    color:#2c3e50;
    border-bottom: 10px solid #eee;
  }
  .shop-title{
    padding: 10px 0px;
  }
  .shop-title img{
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border: 1px solid #eee;
    padding: 2px;
    border-radius: 50%;
  }
  .shop-title span{
    font-size: 18px;
    padding-left: 10px;
    vertical-align: middle;
  }
  .shop-info{
    padding: 5px 0px;
  }
  .shop-volume {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
  .shop-volume div{
    width: 45%;
    display: flex;
  }
  .shop-volume div.shop-num{
    padding-left: 20px;
    position: relative;
    border-right: 1px solid #eee;
  }
  .shop-volume div.shop-num span{
    overflow: hidden;
    text-align: center;
    padding-top: 15px;
  }
  .shop-volume div.shop-num span i{
    font-size: 16px;
  }
  .shop-volume div.shop-num span em{
    font-size: 13px;
  }
  .shop-volume div.shop-num span.item-s{
    padding-right: 15px;
  }
  .shop-volume div.shop-all{
    display: flex;
    flex-direction: column;
  }
  .shop-volume div.shop-all span{
    padding: 5px 0px 0px 42px;
  }
  .shop-volume div.shop-all .item-t{
    display: flex;
  }
  .shop-volume div.shop-all span i{
    padding: 0px 10px;
  }
  .shop-volume div.shop-all span i{
    width: 20px;
  }
  .shop-volume div.shop-all span em{
    color: #fff;
    padding: 0px 2px;
  }
  .shop-tag{
    text-align: center;
    padding: 22px 0px 5px;
  }
  .shop-tag a{
    padding: 5px 35px;
    border-radius: 5px;
    background-color: #eeeeee;
  }
  .better{
    color: #f13e3a;
  }
  .bakbetter{
    background-color: #f13e3a;
  }
  .low{
    color: #32CD32;
  }
  .baklow{
    background-color: #32CD32;
  }
</style>
