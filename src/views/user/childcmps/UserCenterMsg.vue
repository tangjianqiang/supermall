<template>
  <div class="user-meg">
    <div class="msg-message">
      <span>
        <img src="~assets/img/common/message.svg" alt="">
      </span>
      <span>我的消息</span>
    </div>
    <div class="msg-shop">
      <span>
        <img src="~assets/img/common/integral.svg" alt="">
      </span>
      <span>积分商城</span>
    </div>
    <div class="msg-member">
      <span>
        <img src="~assets/img/common/member.svg" alt="">
      </span>
      <span>会员卡</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCenterMsg"
}
</script>

<style scoped lang="less">
 .user-meg{
   overflow: hidden;
   display: flex;
   flex-direction: column;
   border-bottom: 10px solid #eee;
 }
 .user-meg div{
   flex: 1;
   line-height: 45px;
   border-bottom: 1px solid #eee;
   display: flex;
 }
 .user-meg div img{
   width: 20px;
   vertical-align: middle;
   padding-left: 10px;
 }
 .user-meg div span{
   display: block;
   line-height: 45px;
   color: #2c3e50;
   font-size: 15px;
   vertical-align: middle;
 }
 .user-meg div span:nth-child(1){
   width: 10%;
 }
 .user-meg div span:nth-child(2){
   width: 90%;
 }
</style>
