<template>
  <div class="accomplish">
    <HEADER></HEADER>
    <div class="border">
      <div class="con">
        <div class="title">
          <img src="../../assets/success.png" alt="" width="30px" height="30px">
          <p>恭喜您，兑换成功</p>
        </div>
        <div class="small">
          <p>我们将尽快为您发货</p>
        </div>
        <div class="conbtn">
          <mt-button type="primary" size="large" @click.native='handleIndex'>返回首页</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue';
YBB.hybrid.navigation.hide();
export default {
  name: 'accomplish',
  components: { HEADER },
  data() {
    return {};
  },
  methods: {
    handleIndex () {
      this.$router.push('/')
    }
  }
};
</script>

<style lang="less" scoped>
.accomplish {
  .border {
    height: 100%;
    background: white;
    .con {
      height: 90%;
      width: 90%;
      padding: 5%;
      .title {
        font-size: 1.3em;
        padding-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(0, 82, 151);
        font-weight: 500;
        img {
          padding-right: 10px;
        }
      }
      .small {
        p {
          font-size: 0.9em;
          color: #26a2ff;
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
}
</style>
