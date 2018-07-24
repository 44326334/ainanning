<template>
  <div class="checkRecwarp" :style="{height: warpHeight + 'px'}">
    <HEADER></HEADER>
    <div class="checkRecborder">
      <div class='checkReccon'>
        <p class='checkRectitle'>{{ title }}</p>
        <div class='checkRecform'>
          <mt-field label="手机号：" type="tel" v-model.number="phone.data" :state="phone.state"></mt-field>
          <mt-field label="验证码：" type="number" v-model.number="code.data" :state="code.state" class="validate">
            <mt-button size="small" type="primary" @click.native='handleSendCode' plain :disabled="!show">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{count}} s</span>
            </mt-button>
          </mt-field>
          <mt-button size="large" type="primary" @click.native='handleSubmit' class='checkRecnextbtn'>查询</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.checkRecborder {
  height: 100%;
  background: white;
}
.checkReccon {
  height: 90%;
  width: 90%;
  padding: 5%;
}
.checkRectitle {
  font-size: 1.4em;
  padding-top: 20px;
}
.checkRecform {
  width: 100%;
}
.checkRecnumform input {
  text-align: center;
}
.checkRecnextbtn {
  margin-top: 30px;
}
/* covered mint */
.checkRecform .mint-field .mint-cell-title {
  width: auto;
}
.checkRecform .mint-field, .checkRecform .mint-cell-wrapper{
  background-image: none;
}
.checkRecform .mint-cell-value {
  /* border-bottom: 1px solid rgb(207, 207, 207); */
}
.checkRecform .mint-button--small {
  width: 86px;
  font-size: 0.75em;
}
.checkRecform .mint-field-core {
  border-bottom: 1px solid rgb(207, 207, 207);
  line-height: 2;
}
.checkRecform .mint-field-state {
  margin-left: 5px;
}
/* covered end */
</style>

<script>
import {
  senSmsUsingGET,
  queryUsingGET
} from '@/../client/javascript/vue-api-client.js';
import HEADER from '@/components/header.vue'
YBB.hybrid.navigation.hide();
const TIME_COUNT = 60;

export default {
  name: 'checkrecord',
  components: { HEADER },
  data () {
    return {
      warpHeight: null,
      bodyHeight: null,
      title: '购买记录查询',
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
    }
  },
  methods: {
    handleSendCode() {
      if (this.phone.state !== 'success') {
        this.$toast({ message: '请填写手机号', position: 'top' });
      } else {
        let that = this
        senSmsUsingGET({ mobile: this.phone.data }).then(function(res) {
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
      if (this.phone.state === 'success' && this.code.state === 'success') {
        this.$indicator.open();
        //生成购买记录
        queryUsingGET({
          mobile: this.phone.data,
          code: this.code.data
        }).then(response => {
          if (response.data.code === 0) {
            this.$store.commit('checkrecord', response.data.list);
            setTimeout(() => {
              this.$router.push('/record');
              this.$indicator.close();
            }, 1000);
          }
        });
        this.$store.commit('buyCard', {
          phone: this.phone.data,
          code: this.code.data,
          payed: false
        });
      } else {
        this.$toast({ message: '请填写正确', position: 'top' });
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
    deep: true
  },
  mounted () {
    // this.warpHeight = this.bodyHeight = window.screen.height
    if (this.$store.state.carded.phone) {
      this.phone.data = this.$store.state.carded.phone;
    }
  }
}
</script>
