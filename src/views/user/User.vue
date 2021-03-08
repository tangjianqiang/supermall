<template>
  <div id="user">
    <UserBar class="user-bar">
      <div slot="center">
        <span>个人中心</span>
      </div>
    </UserBar>
    <UserLoginArea :userLogin="userLogin" @user-login-to="userLoginTo"/>
    <UserBalance :userPrice="userPrice"/>
    <UserCenterMsg/>
    <UserBottonLoad @go-shop-cart="goShopCart"/>
  </div>
</template>

<script>
/*公共组件*/
import UserBar from "components/navigationbar/Navigationbar"

/*子组件*/
import UserLoginArea from "views/user/childcmps/UserLoginArea"
import UserBalance from "views/user/childcmps/UserBalance"
import UserCenterMsg from "views/user/childcmps/UserCenterMsg"
import UserBottonLoad from "views/user/childcmps/UserBottonLoad"

/*辅助函数*/
import { mapMutations } from "vuex"

export default {
  name: "User",
  data(){
    return{
      userLogin:{
        user:{//直接在data中引入本地图片，用require
          avatar:require("assets/img/common/login.svg"),
          userName:"登录/注册"
        }
      },
      userPrice:{
        balance:"0.00",
        disCount:0,
        integral:0
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  components:{
    UserBar,
    UserLoginArea,
    UserBalance,
    UserCenterMsg,
    UserBottonLoad
  },
  methods:{
    ...mapMutations(['addUserInfo']),
    userLoginTo(){
      this.$router.push("login")
    },
    getUserInfo() {
      const userInfo = JSON.parse(window.sessionStorage.userInfo)
      this.userLogin.user = {
        avatar:userInfo.avatar,
        userName:userInfo.dbname,
      }
      this.userPrice = {
        balance:userInfo.price,
        disCount:userInfo.discount,
        integral:userInfo.integral
      }
      console.log(userInfo)
    },
    goShopCart(){
      this.$router.push("/cart")
    }
  }
}
</script>

<style scoped lang="less">
  .user-bar{
    background-color: hotpink;
    color: #ffffff;
    font-weight: 500;
  }
</style>
