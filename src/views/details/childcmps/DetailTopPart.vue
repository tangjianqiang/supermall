<template>
  <div class="detail-top" v-if="Object.keys(topPart).length > 0">
    <div class="top-title">
      <h2>{{topPart.title}}</h2>
    </div>
    <div class="top-price">
      <span class="new-price" :style="{color:topPart.color}">{{topPart.price}}</span>
      <span class="old-price">{{topPart.oldPrice}}</span>
      <span class="dis-count" v-show="disCountShow" :style="{backgroundColor:topPart.color}">{{topPart.discountDesc}}</span>
    </div>
    <div class="top-volume">
      <span v-for="item in topPart.columns">
        {{item}}
      </span>
    </div>
    <div class="top-service">
      <span v-for="item in topPart.services">
        <img :src="item.icon" @load="imageLoad" alt="">
        <i>{{item.name}}</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailTopPart",
  props:{
    topPart:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  mounted() {
    console.log(this.topPart.discountDesc === "")
  },
  computed:{
    disCountShow(){
      return this.topPart.discountDesc !== ""
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
  .detail-top{
    padding:10px 6px;
    color:#2c3e50;
    overflow: hidden;
    border-bottom: 10px solid #eee;
  }
  .top-title{
    padding:5px 0px;
  }
  .top-title h2{
    font-size: 18px;
    font-weight: normal;
  }
  .top-price{
    padding:5px 0px;
  }
  .top-price span.new-price{
    font-size: 18px;
    padding-right: 5px;
  }
  .top-price span.old-price{
    font-size: 14px;
    padding-right: 5px;
    text-decoration: line-through;
    color:#696969;
  }
  .top-price span.dis-count{
    padding:0px 5px;
    border-radius: 10px;
    vertical-align: top;
    font-size: 13px;
    color:#fff;
  }
  .top-volume{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    padding: 10px 0px;
    border-bottom: 1px solid #F5F5F5;
  }
  .top-volume span{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #696969;
  }
  .top-volume span:nth-child(1){
    text-align: left;
  }
  .top-volume span:nth-child(3){
    text-align: right;
  }
  .top-service{
    padding:18px 0px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
  .top-service span{
    flex:1;
  }
  .top-service span img{
    width: 20px;
    height: 20px;
  }
  .top-service span{
    text-align: center;
  }
  .top-service span:nth-child(1){
    text-align: left;
  }
  .top-service span:nth-child(3){
    text-align: right;
  }
  .top-service span img,.top-service span i{
    vertical-align: middle;
  }
</style>
