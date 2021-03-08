<template>
  <div class="home-view-list">
    <div class="list-body" v-for="item in homeTypelist" @click="pathToDetail(item.iid)">
      <a href="javascript:;">
        <img v-lazy="item.show.img" @load="imageLoad" alt="">
        <div>
           <p>{{item.title}}</p>
           <span class="price">¥{{item.price}}</span>
           <span class="collect">{{item.cfav}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeViewList",
  props:{
    homeTypelist:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('item-image-load1')
    },
    pathToDetail(iid){
      this.$router.push({
        name:"detail",
        params:{
          iid:iid
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .home-view-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .home-view-list .list-body{
    width:48%;
  }
  .home-view-list .list-body div{
    font-size: 15px;
    text-align: center;
    padding:5px 0px 10px;
  }
  .home-view-list .list-body a{
    display: block;
  }
  .home-view-list .list-body p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-top: 3px;
  }
  .home-view-list .list-body img{
    width:100%;
    vertical-align: middle;
    border-radius: 3px;
  }
  .home-view-list .list-body .price{
    color:hotpink;
  }
  .home-view-list .list-body .collect{
    margin-left: 20px;
    position: relative;
  }
  .home-view-list .list-body .collect::before{
    content: '';
    position: absolute;
    left: -13px;
    top: 3px;
    width: 14px;
    height: 14px;
    color:hotpink;
    background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
