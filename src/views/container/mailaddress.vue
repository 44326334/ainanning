<template>
  <div class="mailaddress">
    <HEADER></HEADER>
    <div class="border">
      <div class="con">
        <mt-field label="手机号：" type="tel" v-model.number="phone.data" :state="phone.state"></mt-field>
        <mt-field label="姓名：" type="string" v-model="name.data" :state="name.state"></mt-field>
        <div class="page-content">
          <mt-cell class="noline areaform" title="省市区" :value="areaString" is-link @click.native="handlerArea"></mt-cell>
          <mt-cell class="noline" title="街道" :value="streetString" is-link @click.native="handlerStreet"></mt-cell>
          <mt-field label="详细地址：" type="string" v-model="houseString"></mt-field>

          <mt-popup v-model="areaVisible" class="area-class" position="bottom">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            <mt-button type="primary" size="large" @click.native='handlePopdown("areaVisible")'>确认</mt-button>
          </mt-popup>
          <mt-popup v-model="streetVisible" class="area-class" position="bottom">
            <mt-picker :slots="slotstree" @change="onStreeChange"></mt-picker>
            <mt-button type="primary" size="large" @click.native='handlePopdown("streetVisible")'>确认</mt-button>
          </mt-popup>
        </div>
        <div class="conbtn">
          <mt-button type="primary" size="large" @click.native='handleSubmit'>确认兑换</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue';
import { consumeUsingPOST } from '@/../client/javascript/vue-api-client.js';
import { Picker } from 'mint-ui';
import data from '@/../static/address4.json';
YBB.hybrid.navigation.hide();
let index = 0;
let index2 = 0;
let index3 = 0;
// 初始化省
let province = data.map(res => {
  return res.name;
});
// 初始化市
let city = data[index].childs.map(res => {
  return res.name;
});
// 初始化区
let area = data[index].childs[index2].childs.map(res => {
  return res.name;
});
// 初始化街
let street = data[index].childs[index2].childs[index3].childs.map(res => {
  return res.name;
});

export default {
  name: 'mailaddress',
  components: { HEADER },
  data() {
    return {
      phone: {
        data: null,
        state: ''
      },
      name: {
        data: null,
        state: ''
      },
      province: '',
      city: '',
      area: '',
      areaVisible: false,
      streetVisible: false,
      areaString: '请选择',
      streetString: '请选择',
      houseString: '',
      slots: [
        {
          flex: 1,
          values: province,
          className: 'slot1',
          textAlign: 'left'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: city,
          className: 'slot3',
          textAlign: 'left'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: area,
          className: 'slot5',
          textAlign: 'left'
        }
      ],
      slotstree: [
        {
          flex: 1,
          values: street,
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    };
  },
  methods: {
    handleSubmit() {
      if (this.phone.state === 'success' && this.name.state === 'success') {
        this.$indicator.open();
        this.$store.commit('createInfos', {
          orderMobile: this.$store.state.consume.phone,
          coupon: this.$store.state.consume.code,
          province: this.province,
          city: this.city,
          district: this.area,
          mobile: this.phone.data,
          name: this.name.data,
          address: this.streetString + this.houseString
        });
        setTimeout(() => {
          consumeUsingPOST(this.$store.state.infos)
            .then(res => {
              if (res.data.code === 0) {
                this.$indicator.close();
                this.$router.push({
                  name: 'accomplish',
                  params: { message: res.data.message }
                });
              } else {
                this.$toast(res.data.message);
              }
            })
            .catch(err => {
              this.$toast(err.message);
            });
          this.$indicator.close();
        }, 2000);
      } else {
        this.$toast('请填写正确');
      }
    },
    handlerArea() {
      this.areaVisible = true;
    },
    handlerStreet() {
      if (this.slotstree[0].values.length === 0) {
        this.streetString = '无可选街道';
        return;
      }
      this.streetVisible = true;
    },
    onValuesChange(picker, values) {
      let one = values[0];
      let two = values[1];
      let three = values[2];
      index = province.indexOf(one);
      if (index >= 0 && province.length > 0) {
        city = data[index].childs.map(res => {
          return res.name;
        });
        picker.setSlotValues(1, city);
        two = values[1];
      }
      index2 = city.indexOf(two);
      if (index2 >= 0 && city.length > 0) {
        area = data[index].childs[index2].childs.map(res => {
          return res.name;
        });
        picker.setSlotValues(2, area);
        three = values[2];
      }
      index3 = area.indexOf(three);
      if (index >= 0 && index2 >= 0 && index3 >= 0) {
        street = data[index].childs[index2].childs[index3].childs.map(res => {
          return res.name;
        });
        this.slotstree[0].values = street;
      }
      if (index2 === -1 || index3 === -1) {
        this.streetString = '无可选街道';
      }
      this.areaString = values.join('');
      this.province = one;
      this.city = two;
      this.area = three;
    },
    onStreeChange(picker, values) {
      this.streetString = values.join('');
    },
    handlePopdown(item) {
      switch (item) {
        case 'areaVisible':
          this.areaVisible = false;
          break;
        case 'streetVisible':
          this.streetVisible = false;
        default:
          break;
      }
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
    'name.data': function() {
      const reg = /^[\u4E00-\u9FA5]{2,4}$/;
      if (!reg.test(this.name.data)) {
        this.name.state = 'error';
      } else {
        this.name.state = 'success';
      }
    },
    addressXian: {
      handler(val, oval) {
        let street = this.xianObj[this.addressXian];
        this.streetSlots[0].values = street;
      }
    },
    deep: true
  },
  mounted: function() {
    // console.log(this.$route.matched);
    // console.log(this.$store.state)
    if (this.$store.state.consume.phone) {
      this.phone.data = this.$store.state.consume.phone;
    }
  }
};
</script>

<style lang="less">
.mailaddress {
  .border {
    height: 100%;
    background: white;
    .con {
      height: 90%;
      width: 90%;
      padding: 5%;
      .mint-cell-value {
        border-bottom: 1px solid rgb(207, 207, 207);
      }
      .mint-field .mint-cell-title {
        // width: auto;
      }
      .mint-cell {
        text-align: left;
      }
      .mint-cell-wrapper {
        background-repeat: inherit;
      }
      .page-content {
        .area-class {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: end;
        }
        .mint-cell-wrapper .mint-cell-value {
          display: flex;
          flex: 2;
        }
      }
      .conbtn {
        margin-top: 3rem;
        width: 100%;
        display: flex;
        flex: 1;
        justify-content: center;
        .mint-button--large {
          width: 80%;
        }
      }
    }
  }
  .mint-button--normal {
    margin: 20px 0;
  }
  .mint-cell-wrapper {
    background-repeat: inherit;
    background-image: none !important;
  }
  .mint-cell:last-child {
    background-image: none !important;
  }
  .mint-cell .mint-cell-title {
    width: 105px;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
  }
  .mint-cell-value.is-link {
    margin-right: 0;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    padding-right: 0.75rem;
  }
  .mint-cell-allow-right::after {
    border: 0;
  }
}
</style>
