<template>
  <div class="user-balance">
    <div class="balance-left common">
      <div>
        <span><em>{{userPrice.balance}}</em>元</span><br>
        <span>我的余额</span>
      </div>
    </div>
    <div class="balance-center common">
      <div>
        <span><em>{{userPrice.disCount}}</em>个</span><br>
        <span>我的优惠</span>
      </div>
    </div>
    <div class="balance-right common">
      <div>
        <span><em>{{userPrice.integral}}</em>分</span><br>
        <span>我的积分</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBalance",
  props:{
    userPrice:{
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
  .user-balance{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    border-bottom: 10px solid #eee;
  }
  .user-balance div.common{
    flex: 1;
    padding: 15px 0px;
    text-align: center;
  }
  .user-balance div.balance-left div,.user-balance div.balance-center div{
    border-right: 1px solid #eee;
  }
  .user-balance div span{
    font-size: 15px;
    color: #2c3e50;
  }
  .user-balance div span:nth-child(1) em{
    color: hotpink;
    font-size: 18px;
    padding-right: 3px;
  }
</style>
