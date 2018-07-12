<template>
  <div class="warp">
    <div class="icon">
      <img src="../assets/photo.png" alt="" width="80px">
    </div>
    <div class="title">
      上传图片检测
    </div>
  </div>
</template>

<style lang="less" scoped>
.warp{
  height: 3.3rem;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  box-shadow: 0px -2px 10px rgb(230, 230, 230);
  background: white;
  .title{
    position: absolute;
    bottom: 0.5rem;
    width: 100%;
    height: 21px;
  }
  .icon{
    position: fixed;
    z-index: 1;
    bottom: 1rem;
    left: 0;
    right: 0;
  }
}
</style>

<script>
export default {
  data () {
    return {
      selected: ''
    }
  }
}
</script>
