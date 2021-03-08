import {request} from './request'

export function getDetailData(iid){
  return request({
    url: "detail",
    params:{
      iid
    }
  })
}
export function getDetailListData(type,page){
  return request({
    url:'home/data',
    params:{
      type,
      page
    }
  })
}
