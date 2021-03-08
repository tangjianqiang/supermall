<template>
  <div class="home-pop">
    <h2>本周流行</h2>
    <ul>
      <li v-for="item in pop">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad" alt="">
          <span>{{item.title}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pop",
  props:{
    pop:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('item-image-load1')
    }
  }
}
</script>

<style scoped lang="less">
 .home-pop h2{
   font-size: 20px;
   line-height: 50px;
   text-align: center;
   color:#2c3e50;
 }
 .home-pop ul{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
 }
 .home-pop ul li{
   width:25%;
   text-align: center;
   padding-bottom: 10px;
 }
 .home-pop ul li a,.home-pop ul li span{
   display: block;
 }
 .home-pop ul li span{
   font-size: 16px;
   margin-top: -18px;
 }
 .home-pop ul li img{
   width: 65px;
   height: 65px;
 }

</style>
