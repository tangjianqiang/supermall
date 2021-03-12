import Vue from 'vue'
import axios from 'axios'

export function request(config){
  return new Promise((resolve,reject)=>{
    /*创建axios实例 axios.create*/
    const instance = axios.create({
      baseURL:'http://106.54.54.237:8000/api/mn/',
      timeout:5000
    })
    /*拦截器*/
    instance.interceptors.request.use(config=>{
      /*请求拦截器登录携带token判断、或者请求加载状态等等可以放在请求拦截里面，必须后面return返回，否则request拿不到值，拦截后的值必须给返回回去*/
      Vue.$indicator.open("加载中...")
      /*config为请求头*/
      return config
    },err=>{
      //console.log(err);
    })
    instance.interceptors.response.use(res=>{
      /*响应拦截器必须是返回后的数据状态，也必须返回给request，响应拦截成功后，不return返回，也是拿不到值得*/
      Vue.$indicator.close()
      return res.data
    },err=>{
      //console.log(err);
    })
    /*发送网络请求*/
    instance(config)
      .then(res=>{
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      })
  })
}
