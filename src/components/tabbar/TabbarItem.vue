<template>
  <div class="item-slide-bar" @click="btnClick()">
    <div v-if="!isActive"><slot name="item-img"></slot></div>
    <div v-else><slot name="item-img-active"></slot></div>
    <div :style="isFonsColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props:{
    path:{
      type:String
    },
    fontColor:{
      type:String,
      default:'red',
      required:true
    }
  },
  data(){
    return{
      isShow:true
    }
  },
  computed:{
    isActive(){ //用来获取当前路由状态，true/false，
      return this.$route.path.indexOf(this.path) !== -1;
    },
    isFonsColor(){
      return this.isActive ? {color: this.fontColor} : {};
    }
  },
  methods:{
    btnClick(event){
      this.$router.replace(this.path);
    }
  }
}
</script>

<style scoped>
  .item-slide-bar{
    flex:1;
    font-size:16px;
    text-align:center;
    height: 49px;
  }
  .item-slide-bar img{
    width:20px;
    height:20px;
    margin-top:5px;
    vertical-align: middle;
  }
  /*.active{*/
  /*  color:#d81e06;*/
  /*}*/
</style>
