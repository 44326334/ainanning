<template>
  <div class="warp" :style="{height: warpHeight + 'px'}" v-show="responseCon">
    <HEADER></HEADER>
    <div class="border">
      <div class="con">
        <div class="title">
          <img src="../../assets/success.png" alt="" srcset="" width="50px" height="50px" v-if="state">
          <img src="../../assets/error.png" alt="" srcset="" width="50px" height="50px" v-else>
          <p>{{ title }}</p>
        </div>
        <div class="content" v-if="state">
          <p>卡券编号：{{ orderNo }}</p>
        </div>
        <div class="content" v-else>
          <p>失败信息：{{ message }}</p>
        </div>
        <div class="footer" v-if="state">
          <mt-button size="small" type="primary" slot='footer' :disabled="!orderNo?true:false"
            v-clipboard:copy="orderNo"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            复制并前往兑换
          </mt-button>
        </div>
        <div class="footer" v-else>
          <mt-button size="small" type="primary" slot='footer' @click="goback">
            返回
          </mt-button>
          <mt-button size="small" type="primary" slot='footer' @click="refresh">
            刷新
          </mt-button>
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
    padding-top: 40px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    img {
      padding-right: 20px;
    }
  }
  .content {
    margin: 40px;
    p {
      font-size: 1.2em;
      color: grey;
    }
  }
  .footer {
    margin: 40px;
    a {
      font-size: 0.8em;
    }
  }
}
</style>

<script>
import { getCouponUsingGET } from '@/../client/javascript/vue-api-client.js';
import HEADER from '@/components/header.vue'
YBB.hybrid.navigation.hide();
const coupons = COUPONS_URL;

export default {
  name: 'complied',
  components: { HEADER },
  data () {
    return {
      warpHeight: null,
      bodyHeight: null,
      title: '支付成功',
      orderNo: '',
      responseCon: '',
      state: true,
      message: '支付失败'
    }
  },
  methods: {
    onCopy: function(e) {
      this.$toast({ message: '复制成功', position: 'top' });
      this.$indicator.open('跳转中...');
      setTimeout(() => {
        if (e.text) {
          this.$indicator.close();
          // window.location.href = coupons;
          this.$router.push({name: 'consume', params: {path: this.$router.currentRoute.path}})
        }
      }, 1000);
    },
    onError: function(e) {
      this.$toast({ message: '复制失败', position: 'top' });
    },
    goback() {
      this.$router.push('/infos');
    },
    refresh() {
      window.location.reload();
    }
  },
  created: function() {
    this.$indicator.open('加载中...');
    let URL = window.location.href;
    let skip = URL.split('?orderno=');
    let orderNo = { orderNo: skip[1] };
    if (orderNo) {
      setTimeout(() => {
        getCouponUsingGET(orderNo)
          .then(res => {
            if (res.data.code === 0) {
              this.orderNo = res.data.body;
              this.state = true;
              this.responseCon = 'show';
              this.$indicator.close();
            } else {
              this.responseCon = 'show';
              this.title = '支付失败';
              this.state = false;
              this.message = res.data.message;
            }
          })
          .catch(err => {
            this.responseCon = 'show';
            this.title = '支付失败';
            this.state = false;
            this.message = err.message;
            this.$indicator.close();
          });
      }, 3000);
    }
  },
  mounted () {
    // this.warpHeight = this.bodyHeight = window.screen.height
  }
}
</script>
