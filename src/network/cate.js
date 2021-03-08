import {request} from "./request"

export function getCateListData(type,page){
  return request({
    url:'home/data',
    params:{
      type,
      page
    }
  })
}
