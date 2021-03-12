<template>
  <div class="fixd-tabbar flex">
     <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabbar"
}
</script>

<style scoped>
  .fixd-tabbar{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    z-index:15;
    background-color: #F5F5F5;
    box-shadow: 0px -1px 2px rgba(100,100,100,.1);
  }
  .flex{
    display: flex;
  }
</style>
