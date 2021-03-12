<template>
  <div class="detail-rate">
    <div class="rate-top">
      <span>用户评价</span>
      <span @click="clickRateMore">更多</span>
    </div>
    <div v-if="userRate.length !== 0" class="rate-content" v-for="item in userRate">
      <div class="rate-avatar">
        <img :src="item.user.avatar" @load="imageLoad" alt="">
        <span>{{item.user.uname}}</span>
      </div>
      <div class="rate-meg">{{item.content}}</div>
      <div class="rate-time">
        <span>{{timeConersion(item.created)}}</span>
<!--        <span>{{item.created | timeConersion}}</span> 使用过滤器-->
        <span>{{item.style}}</span>
      </div>
      <div class="rate-img">
        <img v-for="i in item.images" :src="i" Preview="0" @load="imageLoad" alt="">
      </div>
    </div>
    <div v-else class="rate-content no-pay">
      没有用户评论哟~
    </div>
  </div>
</template>

<script>
import {dateFormat} from 'assets/common/utils'

export default {
  name: "DetailUserRate",
  data(){
    return{}
  },
  props:{
    userRate:{
      type: Array,
      default(){
        return []
      }
    },
    shopId:{
      type: String,
      default() {
        return ''
      }
    }
  },
  computed:{
    timeConersion(){
      /*时间戳转换*/
      return function (item){
        return dateFormat(item*1000,'Y-M-D')
      }
    }
  },
  filters:{
    timeConersion(item){
      return dateFormat(item*1000,'Y-M-D')
    }
  },
  methods:{
    imageLoad(){
      /*事件总线*/
      this.$bus.$emit('item-image-load2')
      /*photo-view刷新*/
      this.$previewRefresh()
    },
    clickRateMore(){
      this.$router.push({
        name:"detail",
        params:{
          iid:this.shopId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .detail-rate{
    padding:10px 0px;
    color:#2c3e50;
  }
  .rate-top{
    padding:10px 26px 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .rate-top span{
    font-size: 15px;
  }
  .rate-content{
    display: flex;
    flex-direction: column;
    padding: 10px 26px;
  }
  .rate-content .rate-avatar{
    padding:10px 0px;
    font-size: 15px;
  }
  .rate-content .rate-avatar img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    padding-right: 15px;
  }
  .rate-content .rate-avatar img,.rate-content .rate-avatar span{
    vertical-align: middle;
  }
  .rate-content .rate-meg{
    color: #696969;
    padding-bottom: 5px;
  }
  .rate-content .rate-meg,.rate-content .rate-time{
    font-size: 14px;
    line-height: 22px;
  }
  .rate-content .rate-time{
    color: #C0C0C0;
  }
  .rate-content .rate-img{
    display: flex;
    padding: 5px 0px;
  }
  .rate-content .rate-img img{
    width: 60px;
    height: 60px;
    padding-right: 3px;
  }
  .rate-content .rate-time span{
    padding-right: 5px;
  }
  .no-pay{
    height: 20px;
    text-align: center;
    color: #696969;
  }
</style>
