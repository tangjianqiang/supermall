<template>
  <div id="login">
    <div class="user-login">
      <h2>用户登录</h2>
      <div class="login-form">
        <mt-field label="用户名" ref="username" placeholder="用户名" v-model="username"></mt-field>
        <mt-field label="密码" ref="password" placeholder="密码" type="password" v-model="password"></mt-field>
        <mt-button
          size="large"
          class="mybutton"
          @click.native="login"
        >登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { userLoginInfo } from "network/login"

export default {
  name: "Login",
  data(){
    return{
      username:"", //默认用户名
      password:""  //默认密码
    }
  },
  methods:{
    login(){
      if(this.username === ""){
        this.$messagebox.alert('请输入用户名').then(action => {
          console.log(this.$refs.username.$el)
          this.$refs.username.$el.focus()
        });
      }else if(this.password === ""){
        this.$messagebox.alert('请输入密码').then(action => {
          this.$refs.password.$el.focus()
        });
      }else{
        let data = userLoginInfo()
        let storage = window.sessionStorage
        //随机生成token
        //这里请求服务器数据，并且返回token，保存到sessionStrorage
        storage.setItem("data", data.userInfo[0].login.token) //记录token
        storage.setItem("userInfo",JSON.stringify(data.userInfo[1].center)) //记录用户资料
        storage.setItem("order",JSON.stringify(data.userInfo[2].order)) //记录订单信息
        this.$toast({
          message:"登录成功"
        })
        this.$router.replace('/home');
      }
    }
  }
}
</script>

<style scoped lang="less">
  #login{
    height: 100vh;
    position: relative;
    z-index: 13;
    color: #2c3e50;
    background-color: #FFCCFF;
  }
  .user-login{
    position: fixed;
    top: 30%;
    left: 11.2%;
    z-index: 14;
    border-radius: 10px;
  }
  .user-login h2{
    background-color: #ffffff;
    text-align: center;
    font-weight: normal;
    line-height: 50px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .user-login .login-form{
    width: 100%;
  }
</style>
