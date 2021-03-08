<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "Backtop"
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 15px;
    bottom: 60px;
    z-index: 12;
    text-align: center;
  }
  .back-top img{
    width:43px;
    height: 43px;
  }
</style>
