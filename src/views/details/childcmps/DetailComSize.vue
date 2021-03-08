<template>
  <div class="detail-size">
     <div class="size-commod">
        <div class="size-item-s" v-for="item in comSize.rule">
          <span v-for="i in item">
            {{i}}
          </span>
        </div>
     </div>
     <div class="size-company">
       <div class="size-item-y" v-for="item in comSize.set">
         <span class="key">{{item.key}}</span><span class="value">{{item.value}}</span>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "DetailComSize",
  data(){
    return{

    }
  },
  props:{
    comSize:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  watch:{
    newName(newValue,oldValue){}
  }
}
</script>

<style scoped lang="less">
  .detail-size{
    padding: 10px 26px;
    color:#2c3e50;
    font-size: 15px;
    border-bottom: 10px solid #eee;
  }
  .size-commod{
    padding-top: 15px;
    overflow: hidden;
  }
  .size-commod .size-item-s,.size-company .size-item-y{
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 15px 0px;
    border-bottom: 1px solid #eee;
  }
</style>
