<template>
  <div class="warp" :style="{height: warpHeight + 'px'}">
    <HEADER></HEADER>
    <div class="border">
      <div class="con">
      <p class="title">{{ title }}</p>
      <div class='content'>
        <p>您本次将购买康云健康服务礼包&nbsp;&nbsp;<span>x{{ this.$store.state.order.num }}</span></p>
        <p>总金额：<span>{{ this.$store.state.order.toal }}</span>元</p>
      </div>
      <div class='footer'>
        <mt-button size="large" type="primary" @click.native='handlePay'>确认支付</mt-button>
      </div>
    </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.border {
  height: 100%;
  background: white;
}
.con {
  height: 90%;
  width: 90%;
  padding: 5%;
  .title {
    font-size: 1.4em;
    padding-top: 20px;
  }
  .content {
    margin: 40px 10px;
    text-align: right;
  }
  .footer {
    margin: 40px 10px;
  }
  span {
    color: red;
  }
}
</style>

<script>
import HEADER from '@/components/header.vue'
YBB.hybrid.navigation.hide();
export default {
  name: 'payment',
  components: { HEADER },
  data() {
    return {
      warpHeight: null,
      bodyHeight: null,
      title: '支付页面',
      sumprice: null,
      pays: {},
      localOrder: {}
    };
  },
  methods: {
    handlePay() {
      window.location.href = this.$store.state.order.mweb_url
    }
  },
  computed: {
    carded() {
      return this.$store.state.carded;
    },
    order() {
      return this.$store.state.order;
    },
    sum() {
      let res = this.$store.state.carded.price * this.$store.state.carded.sum;
      return res.toFixed(2);
    }
  },
  mounted() {
    // this.warpHeight = this.bodyHeight = window.screen.height;
  }
};
</script>
