import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Fastclick from 'fastclick'
import 'lib-flexible'

import './assets/css/my-mint.less' //修改全局mintui样式


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()  //bscroll 滚动事件总线

Vue.use(Mint)

Fastclick.attach(document.body) //fastclick 300ms延迟

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
