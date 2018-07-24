<template>
  <div class="infoswarp" :style="{height: warpHeight + 'px'}">
    <HEADER></HEADER>
    <div class="infosborder">
      <div class='infoscon'>
        <p class='infostitle'>{{ title }}</p>
        <div class='infosform'>
          <mt-field label="手机号：" type="tel" v-model.number="phone.data" :state="phone.state"></mt-field>
          <mt-field label="验证码：" type="number" v-model.number="code.data" :state="code.state" class="validate">
            <mt-button size="small" type="primary" @click.native='handleSendCode' plain :disabled="!show">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{count}} s</span>
            </mt-button>
          </mt-field>
          <a class="mint-cell mint-field numform">
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text">数量：</span>
              </div>
              <div class="mint-cell-value">
                <div class="mint-field-other">
                  <img src="../../assets/minus.png" alt="" @click="handleNum('minus')">
                </div>
                <input number="true" type="number" class="field-core" v-model.number="sum.data" min="0" max="10">
                <div class="mint-field-other">
                  <img src="../../assets/plus.png" alt="" @click="handleNum('plus')">
                </div>
              </div>
            </div>
            <div class="mint-cell-right"></div>
          </a>
          <mt-button size="large" type="primary" @click.native='handleSubmit' class='nextbtn'>下一步</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.infosborder {
  height: 100%;
  background: white;
}
.infoscon {
  height: 90%;
  width: 90%;
  padding: 5%;
}
.infostitle {
  font-size: 1.4em;
  /* padding-top: 20px; */
}
.infosform {
  width: 100%;
}
.numform input {
  text-align: center;
}
.nextbtn {
  margin-top: 30px;
}
/* covered mint */
.infosform .mint-field .mint-cell-title {
  width: auto;
}
.infosform .mint-field, .infosform .mint-cell-wrapper{
  background-image: none;
}
.infosform .mint-cell-value {
  /* border-bottom: 1px solid rgb(207, 207, 207); */
}
.infosform .mint-button--small {
  width: 86px;
  font-size: 0.75em;
}
.infosform .mint-field-core {
  border-bottom: 1px solid rgb(207, 207, 207);
  line-height: 2;
}
.infosform .mint-field-state {
  margin-left: 5px;
}
.field-core {
  -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    border-radius: 0;
    border: 0;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    width: 4rem;
    margin: 0 1rem;
    background: rgb(238, 238, 238);
}
.numform .mint-cell-value {
  border-bottom: none;
}
/* covered end */
</style>

<script>
import {
  senSmsUsingGET,
  createOrderFromH5UsingPOST
} from '@/../client/javascript/vue-api-client.js';
import HEADER from '@/components/header.vue'
YBB.hybrid.navigation.hide();
const TIME_COUNT = 60;

export default {
  name: 'infos',
  components: { HEADER },
  data () {
    return {
      warpHeight: null,
      bodyHeight: null,
      title: '用户信息填写',
      code: this.$route.params.data,
      show: true,
      count: '',
      timer: null,
      phone: {
        data: null,
        state: ''
      },
      code: {
        data: null,
        state: ''
      },
      sum: {
        data: 1,
        state: ''
      },
      seller: {
        data: 2
      }
    }
  },
  methods: {
    handleSendCode() {
      if (this.phone.state !== 'success') {
        this.$toast({ message: '请填写手机号', position: 'top' });
      } else {
        let that = this
        senSmsUsingGET({ mobile: this.phone.data }).then((res) => {
          that.$toast('短信已发送');
        });
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    handleSubmit() {
      if (
        this.phone.state === 'success' &&
        this.code.state === 'success' &&
        this.sum.state === 'success'
      ) {
        this.$indicator.open();
        //生成订单
        createOrderFromH5UsingPOST({
          mobile: this.phone.data,
          code: this.code.data,
          num: this.sum.data,
          seller: this.seller.data
        }).then(response => {
          if (response.data.code === 0) {
            this.$store.commit('createOrder', response.data.body);
            // window.localStorage.setItem('order',JSON.stringify(response.data.body));
            setTimeout(() => {
              this.$router.push('/payment');
              this.$indicator.close();
            }, 2000);
          }
        })
        this.$store.commit('buyCard', {
          sum: this.sum.data,
          phone: this.phone.data,
          code: this.code.data,
          payed: false
        });
      } else {
        this.$toast({ message: '请填写正确', position: 'top' });
      }
    },
    handleNum(type) {
      switch (type) {
        case 'minus':
          this.sum.data --;
          break;
        case 'plus':
          this.sum.data ++;
          break;
      }
    }
  },
  computed: {
    carded() {
      return this.$store.state.carded;
    }
  },
  watch: {
    'phone.data': function() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(this.phone.data)) {
        this.phone.state = 'error';
      } else {
        this.phone.state = 'success';
      }
    },
    'code.data': function() {
      const reg = 6 && /^\d{6}$/;
      if (!reg.test(this.code.data)) {
        this.code.state = 'error';
      } else {
        this.code.state = 'success';
      }
    },
    'sum.data': function(newQuestion, oldQuestion) {
      const max = 99;
      const min = 1;
      if(newQuestion < min){
        this.sum.data = min;
        this.sum.state = 'success';
      }
      else if(newQuestion > max){
        this.sum.data = max;
        this.sum.state = 'success';
      }
    },
    deep: true
  },
  mounted () {
    // this.warpHeight = this.bodyHeight = document.body.clientHeight
    if (this.sum.data === 1) {
      this.sum.state = 'success';
    }
    if (this.$store.state.carded.phone) {
      this.phone.data = this.$store.state.carded.phone;
      this.sum.data = this.$store.state.carded.sum;
    }
  }
}
</script>
