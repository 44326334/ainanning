<template>
  <div class="warp" :style="{height: warpHeight + 'px',}">
    <div class="border" :style="img">
      <div class="con">
        <div class='card-header'>
          <img src="../../assets/LOGO.png" alt="" srcset="" width="50%">
        </div>
        <div class='card-content'>
          <img src="../../assets/present.png" alt="" srcset="" width="100%">
        </div>
        <div class='card-footer'>
          <h2>{{ name }}</h2>
          <span>(内含:尿检卡、检测结果分析、在线健康咨询)</span>
          <mt-button type="primary" @click.native='handleBuy'>立即购买</mt-button>
          <div>
          </div>
        </div>
        <div class="linkwarp">
          <router-link class="linkto" to='/checkrecord'>查询购买记录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.border{
  height: 100%;
}
.con{
  height: 90%;
  width: 90%;
  padding: 5%;
  .card-header {
    text-align: left;
    padding: 8% 0 10% 0;
    img {
      padding-left: 5%;
    }
  }
  .card-footer span {
    display: block;
    font-size: 0.78em;
    color: rgb(207, 207, 207);
    margin-bottom: 3em;
  }
  .linkwarp {
    margin-top: 8%;
    .linkto {
      color: #26a2ff;
    }
  }
}
</style>

<script>
export default {
  name: 'product',
  data () {
    return {
      warpHeight: null,
      bodyHeight: null,
      img: {
        backgroundImage: "url(" + require("../../assets/border.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center center"
      },
      name: '健康检测礼包'
    }
  },
  methods: {
    handleBuy() {
      this.$router.push({ name: 'infos', params: { data: this.name } });
    }
  },
  mounted () {
    this.warpHeight = this.bodyHeight = window.screen.height
  }
}
</script>
