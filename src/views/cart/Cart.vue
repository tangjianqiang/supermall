<template>
  <div id="cart">
    <CartBar class="cart-bar">
      <div slot="center">
        <span>购物车({{shopItemNum}})</span>
      </div>
    </CartBar>
    <Scroller class="content" :probe-type="3" ref="scroll">
      <CartShopItem :shopItemInfo="shopItemInfo"/>
    </Scroller>
    <CartBottomBar :shopItemNum="shopItemNum" :shopTotalPrice="shopTotalPrice" :shopCheckAll="shopCheckAll" @check-item-all="checkItemAll"/>
  </div>
</template>

<script>
/*公共组件*/
import CartBar from "components/navigationbar/Navigationbar"
import Scroller from "components/scroller/Scroller"

/*子组件*/
import CartShopItem from "views/cart/childcmps/CartShopItem"
import CartBottomBar from "views/cart/childcmps/CartBottomBar"

/*辅助方法*/
import { mapGetters,mapActions} from "vuex"

export default {
 name: "Cart",
 data(){
   return{
     busRefresh:null,
     shopItem:[]
   }
 },
 mounted() {
   this.busRefresh = ()=>{
     if(this.$refs.scroll) {
       this.$refs.scroll.refresh()
     }
   }
   this.$bus.$on("item-image-load3", this.busRefresh)
 },
 activated() {
   this.$refs.scroll.refresh()
 },
 computed:{
   ...mapGetters(['shopItemCount','shopItemNum','shopItemInfo','shopTotalPrice','shopCheckAll'])
 },
 components:{
   CartBar,
   Scroller,
   CartShopItem,
   CartBottomBar
 },
 methods:{
   ...mapActions(['changeItemStatus']),
   BtnClick(){
     console.log("当前活跃的path",this.$route)
   },
   checkItemAll(status){
     this.changeItemStatus(status)
   }
 },
 destroyed() {
  console.log("-----------is destroyed------------");
 }
}
</script>

<style scoped lang="less">
@color: #ffffff;

  #cart{
    height: 100vh;
    position: relative;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 85px;
    z-index: 11;
    background-color: @color;
  }
  .cart-bar{
    background-color: hotpink;
    color: @color;
    font-weight: 500;
  }
</style>
