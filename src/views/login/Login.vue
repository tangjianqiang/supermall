<template>
  <div id="login">
    <div class="user-login">
      <h2>会员登录</h2>
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
/*子组件*/
import { userLoginInfo } from "network/login"

/*辅助方法*/
import { mapActions } from "vuex"

export default {
  name: "Login",
  data(){
    return{
      rempass:false,
      username:"", //默认用户名
      password:""  //默认密码
    }
  },
  mounted() {
    if(this.$cookie.get("setCookie")){
      //加载完成已赋值用户名和密码
      console.log("已赋值")
      this.username = this.$cookie.get("username")
      this.password = this.$cookie.get("password")
    }
  },
  methods:{
    ...mapActions(['addShopInfo']),
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
        this.getToastPass().then(res=>{
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
          //登录成功后跳转
          this.$router.replace('/home')
          //登录成功后数据存储
          this.addShopInfo({
            shopId: data.userInfo[2].order.shopId,   //iid
            decImage: data.userInfo[2].order.decImage, //商品图
            decTitle: data.userInfo[2].order.decTitle,  //商品标题
            detailDesc: data.userInfo[2].order.detailDesc,//商品描述
            shopPrice: data.userInfo[2].order.shopPrice, //商品价格
            status: data.userInfo[2].order.status, //默认选中
            num: data.userInfo[2].order.num
          })
        })
      }
    },
    getToastPass(){
      return new Promise((resolve, reject) => {
          this.$messagebox.confirm("",{
            title:"提示",
            message:"是否记住密码？",
            confirmButtonText:"好的",
            cancelButtonText:"算了"
          }).then(action => {
            if(action === 'confirm'){
              this.$cookie.set("setCookie","true") //点击确定保存至cookie中
              this.$cookie.set("username",this.username)
              this.$cookie.set("password",this.password)
              resolve("存储至cookie")
            }
            console.log(action)
          }).catch(error=>{
            if(error === 'cancel'){
               this.$cookie.remove("setCookie")  //点击取消从cookie中移除
               this.$cookie.remove("username")
               this.$cookie.remove("password")
               resolve("移除cookie")
            }
          })
      })
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
