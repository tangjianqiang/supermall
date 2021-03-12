import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Cookies from 'vue-cookies'
import Mint from 'mint-ui'
import Fastclick from 'fastclick'
import Preview from 'vue-photo-preview'
import 'mint-ui/lib/style.css'
import 'lib-flexible'
import 'vue-photo-preview/dist/skin.css'

import './assets/css/my-mint.less' //修改全局mintui样式

let option = {
  maxSpreadZoom: 1, // 控制预览图最大的倍数，默认是2倍，我这里改成了原图
  fullscreenEl: true, //控制是否显示右上角全屏按钮
  closeEl: false, //控制是否显示右上角关闭按钮
  tapToClose: true, //点击滑动区域应关闭图库
  shareEl: false, //控制是否显示分享按钮
  zoomEl: false, //控制是否显示放大缩小按钮
  counterEl: true, //控制是否显示左上角图片数量按钮
  arrowEl: true,  //控制如图的左右箭头（pc浏览器模拟手机时）
  tapToToggleControls: true, //点击应切换控件的可见性
  clickToCloseNonZoomable: true //点击图片应关闭图库，仅当图像小于视口的大小时
}

Vue.config.productionTip = false

Vue.prototype.$cookie = Cookies  //cookie

Vue.prototype.$bus = new Vue()  //bscroll 滚动事件总线

Vue.use(Mint)

Vue.use(Preview,option)

Fastclick.attach(document.body) //fastclick 300ms延迟

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
