<template>
  <div class="buywarp" :style="{height: warpHeight + 'px',}">
    <HEADER></HEADER>
    <div class="con">
      <img src="../../assets/buy-con.jpg" alt="" width="100%">
      <h2>健康检测大礼包</h2>
      <div class="smallwarp">
        <div class="small">
          <p style="color:rgb(15,152,251)">一份卡券&nbsp;&nbsp;两大服务</p>
        </div>
        <div class="small">
          <p style="color:rgb(245,136,13)">远程解读+检测服务</p>
        </div>
      </div>
      <div class="smallwarp smallgrey">
        <span class="smallleft" style="color:rgb(207, 207, 207)">(内含:尿检卡、检测结果分析、在线健康咨询)</span>
      </div>
    </div>
    <div class="details">
      <div class="title">
        <p>
          <span>详情</span>
        </p>
      </div>
      <img src="../../assets/buy-detail1.jpg" alt="" width="100%">
      <img src="../../assets/buy-detail2.jpg" alt="" width="100%">
      <img src="../../assets/buy-detail3.jpg" alt="" width="100%">
    </div>
    <div class="footer">
      <div class="btnwarp">
        <mt-button type="default" @click="handleCheck">查询购买记录</mt-button>
        </div>
      <div class="btnwarp">
        <mt-button type="primary" @click="handleBuy">立即购买</mt-button>
        </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.buywarp {
  .con {
    background: white;
    width: 100%;
    h2 {
      text-align: left;
      margin-left: 1rem;
      margin-bottom: 0.5rem;
    }
    .smallwarp {
      display: flex;
      flex: 1;
      .small {
        display: flex;
        flex: 1;
        justify-content: center;
      }
      .smallleft {
        font-size: 14px;
        margin-left: 1rem;
      }
    }
    .smallgrey {
      padding-bottom: 2rem;
    }
  }
  .details {
    margin-top: 0.5rem;
    background: white;
    padding-bottom: 2.75rem;
    .title {
      height: 3rem;
      p {
        line-height: 3rem;
        position: relative;
        color: rgb(153, 153, 153);
        font-weight: bold;
        &:before, &:after {
          content: "";
          position: absolute;
          top: 50%;
          right: 25%;
          background: rgb(216, 216, 216);
          height: 2px;
          width: 15%;
        }
        &:before {
          left: 25%
        }
        &:after {
          right: 25%
        }
      }
    }
  }
  .footer {
    height: 3rem;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    display: flex;
    flex: 1;
    .btnwarp {
      display: flex;
      flex: 1;
      height: inherit;
    }
    .mint-button {
      height: inherit;
      width: 100%;
      border-radius: 0;
    }
    .mint-button--primary {
      box-shadow: 0 0 1px #b8bbbf;
    }
  }
}

</style>

<script>
import HEADER from '@/components/header.vue'
YBB.hybrid.navigation.hide();
export default {
  name: 'product',
  components: { HEADER },
  data () {
    return {
      warpHeight: null,
      bodyHeight: null,
      name: '健康检测礼包'
    }
  },
  methods: {
    handleCheck () {
      this.$router.push("./checkrecord")
    },
    handleBuy () {
      this.$router.push({ name: 'infos', params: { data: this.name } })
    }
  },
  mounted () {
    // this.warpHeight = this.bodyHeight = window.screen.height
  }
}
</script>
