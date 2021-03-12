<template>
  <div class="user-login">
    <div class="login-avatar" @click="userLoginTo">
      <span>
        <img :src="userLogin.user.avatar" alt="">
      </span>
    </div>
    <div class="login-info" @click="userLoginTo">
      <span class="user-name">{{userLogin.user.userName}}</span>
      <span class="user-sign" @click="userSignOut">[退出]</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLoginArea",
  props:{
    userLogin:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    userLoginTo(){
      this.$emit('user-login-to')
    },
    userSignOut(){
      this.$emit('user-sign-out')
    }
  }
}
</script>

<style scoped lang="less">
  .user-login{
    background-color: hotpink;
    display: flex;
  }
  .login-avatar{
    width: 25%;
  }
  .login-avatar span{
    overflow: hidden;
    display: block;
    width: 45px;
    height: 45px;
    padding: 5px;
    margin: 10px auto;
    text-align: center;
    line-height: 45px;
    background-color: #ffffff;
    border-radius: 50%;
  }
  .login-avatar span img{
    width: 35px;
    height: 35px;
    padding-top: 3px;
  }
  .login-info{
    width: 75%;
  }
  .login-info span{
    color: #ffffff;
    font-size: 18px;
    margin-left: -10px;
    line-height: 75px;
    vertical-align: middle;
  }
  .login-info span.user-sign{
    margin-left: 10px;
    font-size: 15px;
  }
</style>
