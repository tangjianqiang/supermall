<template>
  <div class="cart-bottom">
    <div class="cart-button">
      <label for="shop">
        <input type="checkbox" value="" ref="checkBox" id="shop" :checked="shopCheckAll" @change="changeItemStatus($event)"><span>全选</span>
      </label>
    </div>
    <div class="cart-total">
      合计: <span>¥{{shopTotalPrice.toFixed(2)}}</span>
    </div>
    <div class="cart-compute" @click="toastTalPrice">
      去下单 <span>({{shopItemNum}})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartBottomBar",
  data(){
    return{

    }
  },
  props:{
    shopItemNum:{
      type: Number,
      default(){
        return 0
      }
    },
    shopTotalPrice:{
      type: Number,
      default(){
        return 0
      }
    },
    shopCheckAll:{
      type: Boolean,
      default(){
        return false
      }
    }
  },
  methods:{
    changeItemStatus(e){
      this.$emit('check-item-all', this.$refs.checkBox.checked)
    },
    toastTalPrice(){
      this.$toast({
        message: '已下单',
        position: 'center',
        duration: 5000
      })
    }
  }
}
</script>

<style scoped lang="less">
  .cart-bottom{
    height: 36px;
    background-color: #DDDDDD;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    z-index: 12;
    line-height: 36px;
    font-size: 14px;
    display: flex;
    flex-wrap: nowrap;
    color: #646464;
    justify-content: space-around;
  }
  .cart-button{
    width: 20%;
  }
  .cart-total{
    width: 50%;
  }
  .cart-total{
    padding-left: 5px;
  }
  .cart-compute{
    width: 30%;
    text-align: center;
    background-color: hotpink;
    color: #ffffff;
  }
  .cart-button span{
    padding-left: 5px;
    vertical-align: middle;
  }
  .cart-button input[type="checkbox"]{
    width: 16px;
    height: 16px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin-left: 15px;
    line-height: 18px;
    position: relative;
  }
  .cart-button input[type="checkbox"]::before{
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
  .cart-button input[type="checkbox"]:checked::before {
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
</style>
