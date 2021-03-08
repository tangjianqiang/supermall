export default {
  addShopInfo(context,payload){
    return new Promise((resolve,reject)=>{
      let index = 0
      for(let i in context.state.shopCart){
        if(context.state.shopCart[i].shopId === payload.shopId){
          index = i
        }
      }
      if(index){
        context.commit("addShopCount",index)
        resolve("已加入购物车")
      }else{
        context.commit("addNewShop",payload)
        resolve("加入购物车成功")
      }
    })
  },
  changeItemStatus(context,payload){
    for(let i in context.state.shopCart){
      context.commit("modItemStatus", {
        index:i,
        status:payload
      })
    }
  }
}
