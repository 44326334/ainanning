<template>
  <div class="consume">
    <HEADER></HEADER>
    <div class="border">
      <div class="con">
        <div class="coninput">
          <mt-field label="卡券号：" type="number" v-model="cardCode.data" :state="cardCode.state"></mt-field>
          <mt-field label="手机号：" type="tel" v-model.number="phone.data" :state="phone.state"></mt-field>
        </div>
        <div class="conbtn">
          <mt-button type="primary" size="large" @click.native='handleSubmit'>立即查询</mt-button>
        </div>
        <div class="res">
          <span class="title">【查询结果】</span>
          <div class="resultcon" v-if="cardres === 'success'">
            <p class="rescon">卡券编号:{{cardinfo.coupon}}</p>
            <p class="rescon">卡券信息:{{cardinfo.productName}}x{{cardinfo.num}}</p>
            <mt-button size="small" @click.native='handleNext'>
              前往兑换 >
            </mt-button>
          </div>
          <div class="resultcon filling" v-if="cardres === 'error'">
            <p class="reserror">{{cardinfo.message}}</p>
          </div>
          <div class="resultcon filling" v-if="cardres === ''">
            <p class="resdefault" style="padding-left:2rem">暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue';
import { checkCouponsUsingGET } from '@/../client/javascript/vue-api-client.js';
YBB.hybrid.navigation.hide();
export default {
  name: 'consume',
  components: { HEADER },
  data() {
    return {
      phone: {
        data: null,
        state: ''
      },
      cardCode: {
        data: null,
        state: ''
      },
      cardres: '',
      cardinfo: {}
    };
  },
  methods: {
    handleSubmit() {
      if (this.phone.state === 'success' && this.cardCode.state === 'success') {
        this.$indicator.open();
        this.$store.commit('validateCard', {
          phone: this.phone.data,
          code: this.cardCode.data,
          payed: false
        });
        setTimeout(() => {
          checkCouponsUsingGET({
            mobile: this.$store.state.consume.phone,
            coupon: this.$store.state.consume.code
          })
            .then(res => {
              if (res.data.code === 0) {
                this.cardres = 'success';
                this.cardinfo = res.data.body;
              } else {
                this.cardres = 'error';
                this.cardinfo = res.data;
              }
              this.$indicator.close();
            })
            .catch(err => {
              this.$toast(err.message);
              this.$indicator.close();
            });
        }, 2000);
      } else {
        this.$toast('请填写正确');
      }
    },
    handleNext() {
      this.$router.push('/mailaddress');
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
    'cardCode.data': function() {
      const reg = 10 && /^\d{10}$/;
      if (!reg.test(this.cardCode.data)) {
        this.cardCode.state = 'error';
      } else {
        this.cardCode.state = 'success';
      }
    }
  },
  deep: true,
  mounted() {
    this.phone.data = this.$store.state.carded.phone
  },
};
</script>

<style lang="less">
.consume {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  .border {
    height: 100%;
    background: white;
    .con {
      height: 90%;
      width: 90%;
      padding: 5%;
      .coninput {
        margin: 0 5%;
      }
      .conbtn {
        margin-top: 2rem;
        width: 100%;
        display: flex;
        flex: 1;
        justify-content: center;
        .mint-button--large {
          width: 80%;
        }
      }
      .res {
        border-top: 1px rgb(207, 207, 207) dotted;
        margin-top: 40px;
        text-align: left;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        .title {
          margin-top: 2rem;
        }
        .resultcon {
          align-self: center;
          width: 80%;
          .mint-button--default {
            color: white;
            background: rgb(255, 136, 0);
          }
          .rescon {
            color: rgb(33, 172, 225);
            font-size: 0.75em;
          }
          .reserror {
            font-size: 0.75em;
            color: red;
          }
        }
        .filling {
          min-height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
      .mint-button--normal {
        padding: 0 30px;
        margin-top: 20px;
      }
    }
  }
  /* convered mint */
  .mint-cell-wrapper {
    background-repeat: inherit;
    background-image: none !important;
  }
  .mint-cell:last-child {
    background-image: none !important;
  }
  .mint-cell-value {
    border-bottom: 1px solid rgb(207, 207, 207);
  }
  .mint-field .mint-cell-title {
    width: auto;
  }
  .mint-field-state {
    margin-left: 5px;
  }
}
</style>
