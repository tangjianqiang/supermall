<template>
  <div class="home-bar">
    <div class="home-bar-nav">
      <span v-for="(item,index) in titles" :key="item" :class="{active:currentIndex === index}" @click="btnClick(index)">
        <i>{{item}}</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homebar",
  data(){
    return{
      currentIndex:0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    btnClick(index){
      this.currentIndex = index
      this.$emit("home-bar-click",index)
      console.log(index);
    }
  }
}
</script>

<style scoped lang="less">
 .home-bar{
   height: 44px;
   line-height: 44px;
   position: relative;
   z-index: 9;
 }
 .home-bar .home-bar-nav{
   padding: 5px 0px;
   display: flex;
   background-color: #fff;
 }
 .home-bar .home-bar-nav span{
   flex:1;
   font-size: 16px;
   color:#2c3e50;
   text-align: center;
 }
 .home-bar .home-bar-nav span i{
   padding:5px;
 }
 .home-bar .home-bar-nav span.active{
   color:hotpink;
 }
 .home-bar .home-bar-nav span.active i{
   border-bottom:3px solid hotpink;
 }
</style>
