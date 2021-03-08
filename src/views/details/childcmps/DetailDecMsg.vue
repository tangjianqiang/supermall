<template>
  <div class="detail-dec">
    <div class="dec-title">
      <h2>{{desMsg.desc}}</h2>
      <p>{{desMsg.key}}</p>
    </div>
    <div class="dec-item">
      <img v-for="item in desMsg.list" v-lazy="item" @load="imageLoad" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailDecMsg",
  data(){
    return{

    }
  },
  props:{
    desMsg:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('item-image-load2')
    }
  }
}
</script>

<style scoped lang="less">
  .detail-dec{
    padding:10px 0px;
    color:#2c3e50;
    border-bottom: 10px solid #eee;
  }
  .dec-title{
    padding:15px 10px 0px;
  }
  .dec-title h2{
    text-align: left;
    font-size: 15px;
  }
  .dec-title p{
    font-size: 14px;
    padding:10px 0px;
  }
  .dec-img{
    padding-top: 5px;
    text-align: center;
  }
  .dec-item{
    overflow: hidden;
  }
  .dec-item img{
    width:100%;
    height: ;
  }
</style>
