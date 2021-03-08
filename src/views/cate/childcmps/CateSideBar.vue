<template>
  <div class="cate-side">
    <div class="side-content">
       <ul>
         <li v-for="(item,index) in titles" :class="{active:currentIndex === index}" @click="btnClick(index)">{{item}}</li>
       </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CateSideBar",
  data(){
    return{
      currentIndex:0
    }
  },
  props:{
    titles:{
      type: Array,
      default(){
        return {}
      }
    }
  },
  methods:{
    btnClick(index){
      this.currentIndex = index
      this.$emit("cate-bar-click",index)
    }
  }
}
</script>

<style scoped lang="less">
  .cate-side{
    position: relative;
    width: 100%;
  }
  .cate-side .side-content{
    background-color: #F8F8FF;
    height: 100%;
  }
  .cate-side .side-content ul{
    display: flex;
    flex-direction: column;
  }
  .cate-side .side-content ul li{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    color: #2c3e50;
  }
  .cate-side .side-content ul li.active{
    background-color: #ffffff;
    color: hotpink;
    border-left:3px solid hotpink;
  }
</style>
