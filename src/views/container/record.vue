<template>
  <div class="recordwarp" :style="{height: warpHeight + 'px'}">
    <HEADER></HEADER>
    <div class="recordcon">
      <h3>【 购买记录 】</h3>
      <ul class="recordlist">
        <li v-for="item in recordlist" :key="item.coupons" :class="item.status === 2?fontGrey:''">
          <p class="resStatus">卡券编号：{{item.coupon}}
            <mt-button v-show="item.status !== 2" size="small" type="primary"
            v-clipboard:copy="item.coupon"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制并前往兑换</mt-button>
          </p>
          <p class="resStatus">卡券礼包：{{item.productName}} X{{item.num}}
            <span v-show="item.status === 2">{{item.statusText}}</span>
          </p>
          <p>购买日期：{{ dateForm(item.orderTime) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.recordwarp {
  background: white;
}
.recordcon {
  height: 90%;
  width: 90%;
  padding: 5%;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;

}
.recordlist {
  height: auto;
  overflow-y: scroll;
  padding: 0 10px;
  margin: 0;
}
.recordlist li {
  list-style-type: none;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid gainsboro;
}
.recordlist .resStatus {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recordcon h3 {
  text-align: left;
  padding-top: 20px;
}
.recordcon p {
  text-align: left;
  margin: 10px 0;
  font-size: 1em;
}
.fontGrey {
  color: gainsboro;
}
/* covered mint */
.recordWarp .mint-button--small {
  padding: 0 5px;
  margin-left: 2px;
  height: 30px;
}
/* covered end */
</style>

<script>
import HEADER from '@/components/header.vue'
YBB.hybrid.navigation.hide();
const coupons = COUPONS_URL;
export default {
  name: 'record',
  components: { HEADER },
  data () {
    return {
      warpHeight: null,
      bodyHeight: null,
      recordlist: this.$store.state.recordlist,
      fontGrey: 'fontGrey'
    }
  },
  methods: {
    dateForm(time) {
      let date = time;
      return date ? date.substring(0, 10) : '';
    },
    onCopy: function(e) {
      this.$toast({ message: '复制成功', position: 'top' });
      this.$indicator.open('跳转中...')
      setTimeout(() => {
        if (e.text) {
          this.$indicator.close()
          // window.location.href = coupons
          this.$router.push({name: 'consume', params: {path: this.$router.currentRoute.path}})
        }
      }, 1000);
    },
    onError: function(e) {
      this.$toast({ message: '复制失败', position: 'top' });
    }
  },
  mounted () {
    // this.warpHeight = this.bodyHeight = window.screen.height
  }
}
</script>
