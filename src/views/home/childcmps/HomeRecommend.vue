<template>
  <div class="home-recommend">
    <ul>
      <li v-for="item in recommend">
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
  name: "recommend",
  props:{
    recommend:{
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
  .home-recommend{
    overflow: hidden;
    border-bottom: 10px solid #eee;
  }
  .home-recommend ul{
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    padding:15px 0 16px;
  }
  .home-recommend ul li{
    flex:1;
    text-align: center;
  }
  .home-recommend ul li a,.home-recommend ul span{
    display: block;
    font-size: 16px;
  }
  .home-recommend li img{
    width:45px;
    height: 45px;
  }
</style>
