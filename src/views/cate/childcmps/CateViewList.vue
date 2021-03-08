<template>
  <div class="cate-view-list">
    <div class="list-body" v-for="item in cateTypeList" @click="pathToDetail(item.iid)">
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
  name: "CateViewList",
  props:{
    cateTypeList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  created() {

  },
  mounted() {
    console.log(this.cateTypeList)
  },
  methods:{
    imageLoad(){
      console.log(111)
      this.$bus.$emit('item-image-load2')
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
  .cate-view-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .cate-view-list .list-body{
    width:48%;
  }
  .cate-view-list .list-body div{
    font-size: 15px;
    text-align: center;
    padding:5px 0px 10px;
  }
  .cate-view-list .list-body a{
    display: block;
  }
  .cate-view-list .list-body p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-top: 3px;
  }
  .cate-view-list .list-body img{
    width:100%;
    vertical-align: middle;
    border-radius: 3px;
  }
  .cate-view-list .list-body .price{
    color:hotpink;
  }
  .cate-view-list .list-body .collect{
    margin-left: 20px;
    position: relative;
  }
  .cate-view-list .list-body .collect::before{
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
