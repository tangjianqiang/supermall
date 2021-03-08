<template>
  <div class="detail-rec">
    <div class="detail-rec-body" v-for="item in recommendList" @click="pathToDetail(item.iid)">
      <a href="javascript:;">
        <img v-lazy="item.show.img" @load="imageLoad" alt="">
        <div>
          <p>{{item.title}}</p>
          <span class="price">{{item.price}}</span>
          <span class="collect">{{item.cfav}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRecUsr",
  data(){
    return{

    }
  },
  props:{
    recommendList:{
      type: Array,
      default(){
        return []
      }
    }
  },
  created() {

  },
  methods:{
    pathToDetail(iid){
      this.$router.push({
        name: 'detail',
        params:{
          iid:iid
        }
      })
    },
    imageLoad(){
      this.$bus.$emit('item-image-load2')
    }
  }
}
</script>

<style scoped lang="less">
  .detail-rec{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .detail-rec .detail-rec-body{
    width:48%;
  }
  .detail-rec .detail-rec-body div{
    font-size: 15px;
    text-align: center;
    padding:5px 0px 10px;
  }
  .detail-rec .detail-rec-body a{
    display: block;
  }
  .detail-rec .detail-rec-body p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-top: 3px;
  }
  .detail-rec .detail-rec-body img{
    width:100%;
    vertical-align: middle;
    border-radius: 3px;
  }
  .detail-rec .detail-rec-body .price{
    color:hotpink;
  }
  .detail-rec .detail-rec-body .collect{
    margin-left: 20px;
    position: relative;
  }
  .detail-rec .detail-rec-body .collect::before{
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
