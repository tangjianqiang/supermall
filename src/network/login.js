/*
*
* 这里没有接口模拟返回数据，使用静态数据返回
*
* */
export function userLoginInfo(){
  return {
    "userInfo":[
      {
        "login":{
          "status":"1",
          "token":"U8cMFUjakSKI2mus"
        }
      },
      {
        "center":{
          "avatar":require("assets/img/common/login.png"),
          "dbname":"itom",
          "price":268.13,
          "discount":12,
          "integral":886
        }
      },
      {
        "order":{
          "shopId":"1lrzvr8",
          "decImage":"//s11.mogucdn.com/mlcdn/c45406/180301_1cik8f3fj0gf2839ddch880422ffc_640x960.jpg",
          "decTitle":"【2件69元】【新品特惠】短袖t恤女2018夏装新款韩版学生宽松黑色体恤圆领纯棉半袖上衣服",
          "detailDesc":"【2件69元】【新品特惠】【赠送运费险 七天无理由退换货】【无忧售后】",
          "shopPrice":"49.00",
          "status":true,
          "num":2
        }
      }
    ]
  }
}
