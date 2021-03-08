import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

//获取原型对象上的replace函数
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};


//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/*懒加载*/
const Home = () => import("views/home/Home")
const Cate = () => import("views/cate/Cate")
const Cart = () => import("views/cart/Cart")
const User = () => import("views/user/User")
const Details = () => import("views/details/Details")
const Login = () => import("views/login/Login")

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        title: '首页',
        tabbarshow: true
      }
    },
    {
      path: '/cate',
      name: 'cate',
      component: Cate,
      meta:{
        title: '分类',
        tabbarshow: true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta:{
        title: '购物车',
        tabbarshow: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta:{
        title: '我的',
        tabbarshow: true
      }
    },
    {
      path: '/detail/:iid',
      name: 'detail',
      component: Details,
      meta:{
        title: '详情页',
        tabbarshow: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        title: '登录',
        tabbarshow: false
      }
    }
  ],
  mode:'history'
})

router.beforeEach((to,from,next)=>{
  document.title = to.matched[0].meta.title;
  console.log("导航守卫:",to);
  if(window.sessionStorage.data){
    if(to.path === '/login'){
      //登录状态下 访问login.vue页面 会跳到/home
      next({path: '/home'});
    }else{
      next();
    }
  }else{
    if(to.path === '/login'){  //没有登录状态下，在login.vue，路由守卫必须有next，否则不会执行下一个钩子
      next();
    }else{
      next({ path: '/login' });//没有登录状态下，不在login.vue，在任何页面都跳转到login
    }
  }
})

export default router;
