export default {
  shopItemCount(state){
    return state.shopCart.length
  },
  shopItemNum(state){
    let num = 0
    for(let item of state.shopCart){
      if(item.status) num += item.num
    }
    return num
  },
  shopItemInfo(state){
    return state.shopCart
  },
  shopTotalPrice(state){
    let total = 0
    for(let item of state.shopCart){
      if(item.status) total = (total + parseFloat(item.shopPrice) * item.num)
    }
    return total
  },
  shopCheckAll(state){
    if(state.shopCart.length === 0) return false
    return !state.shopCart.find(item=>{
      return item.status === false
    })
  }
}
