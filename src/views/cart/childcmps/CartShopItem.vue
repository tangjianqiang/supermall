<template>
  <div class="cart-item">
    <div class="item-content" v-for="(item,index) in shopItemInfo" :key="item.shopId">
      <div class="item-left-button">
        <input class="checkbox" type="checkbox" value="" v-model="item.status">
      </div>
      <div class="item-center-img" @click="pathToDetail(item.shopId)">
        <img :src="item.decImage" @load="imageLoad" alt="">
      </div>
      <div class="item-right-info">
        <h3>{{item.decTitle}}</h3>
        <p>{{item.detailDesc}}</p>
        <div class="price">
          <span>¥{{item.shopPrice}}</span>
          <span>x{{item.num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartShopItem",
  props:{
    shopItemInfo:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('item-image-load3')
    },
    pathToDetail(iid){
      this.$router.push({
        name:"detail",
        params:{
          iid:iid
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .cart-item{
    position: relative;
    display: flex;
    flex-direction: column;
    color:#2c3e50;
  }
  .cart-item .item-content{
    flex: 1;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding:5px 0px;
  }
  .item-content .item-left-button{
    width: 10%;
    text-align: center;
  }
  .item-content .item-left-button input[type="checkbox"]{
    width: 16px;
    height: 16px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 18px;
    margin-top: 40px;
    position: relative;
  }
  .item-content .item-left-button input[type="checkbox"]::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    border: 1px solid #CACDCF;
    border-radius: 50%;
  }
  .item-content .item-left-button input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: hotpink;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 1px solid hotpink;
    font-size: 12px;
    font-weight: bold;
    border-radius: 50%;
  }
  .item-content .item-center-img{
    width: 26%
  }
  .item-content .item-center-img img{
    width: 100%;
    height: 90px;
    border-radius: 5px;
  }
  .item-content .item-right-info{
    width: 64%;
    padding:0px 10px;
  }
  .item-content .item-right-info h3,.item-content .item-right-info p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item-content .item-right-info h3{
    font-size: 15px;
  }
  .item-content .item-right-info p{
    line-height: 35px;
    color: #969696;
  }
  .item-content .item-right-info .price{
    display: flex;
    justify-content:space-around;
    padding-top: 10px;
    font-size: 15px;
  }
  .item-content .item-right-info .price span{
    flex: 1;
  }
  .item-content .item-right-info .price span:nth-child(1){
    color: hotpink;
  }
  .item-content .item-right-info .price span:nth-child(2){
    text-align: right;
  }
</style>
