export default {
  addShopCount(state,payload){
    state.shopCart[payload].num++
  },
  addNewShop(state,payload){
    state.shopCart.push(payload)
  },
  modItemStatus(state,payload){
    state.shopCart[payload.index].status = payload.status
  },
  addUserInfo(state,payload){}
}
