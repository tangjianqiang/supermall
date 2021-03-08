<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
name: "navigationbar"
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    box-shadow: 0px 3px 3px rgba(100,100,100,.2);
  }
  .nav-bar .left,.nav-bar .right{
    width:60px;
  }
  .nav-bar .center{
    flex: 1;
  }
</style>
