<template>
  <div class="warp">
    <div class="icon">
      <!-- <img src="../assets/photo.png" alt="" width="80px" @click.stop="photo"> -->
      <div class="circle" @click.stop="photo" ref="photo">
        <img src="../assets/photoicon.png" alt="">
      </div>
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
  .title {
    position: absolute;
    bottom: 0.5rem;
    width: 100%;
    height: 21px;
  }
  .icon {
  position: fixed;
  z-index: 2;
  bottom: 1.8rem;
  left: 0;
  right: 0;
  .circle {
    display: inline-block;
    width: 3.5rem;
    height: 3.5rem;
    background: rgb(109, 186, 245);
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgb(109, 186, 245);
    position: relative;
    &:active {
      &{box-shadow: none;}
    }
    img {
      width: 1.75rem;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
}

</style>

<script>
export default {
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    photo () {
      window.location.href = 'http://kyhlinterface.unishep.cn/cloudbae'
    }
  }
}
</script>
