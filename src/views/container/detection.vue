<template>
  <div>
    <HEADER></HEADER>
    <div class="warp">
      <div class="title">
        <h3>{{title}}</h3>
        <p>{{small}}<span>&nbsp;&nbsp;&nbsp;&nbsp;{{time}}</span></p>
      </div>
      <div class="con" v-for="item in detections" :key="item.id">
        <img :src=item.url alt="" width="100%" v-lazy="item.url">
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.warp {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  background: white;
  .title {
    text-align: left;
  }
  .con {
    margin-top: 20px;
    display: flex;
    flex: 5;
    flex-direction: column;
  }
}
</style>

<script>
import HEADER from '@/components/header.vue'
YBB.hybrid.navigation.hide();
export default {
  name: 'detection',
  components: { HEADER },
  data () {
    return {
      title: '尿常规检测使用说明',
      small: '康云互联',
      time: '2016-12-14',
      detections: [
        {
          id: 1,
          url: require('../../assets/1.jpg')
        },
        {
          id: 2,
          url: require('../../assets/2.jpg')
        },
        {
          id: 3,
          url: require('../../assets/3.jpg')
        },
        {
          id: 4,
          url: require('../../assets/4.jpg')
        },
        {
          id: 5,
          url: require('../../assets/5.jpg')
        },
        {
          id: 6,
          url: require('../../assets/6-1.jpg')
        },
        {
          id: 7,
          url: require('../../assets/7.jpg')
        },
        {
          id: 8,
          url: require('../../assets/8.jpg')
        }
      ]
    }
  }
}
</script>
