<template>
  <div class="navWarp">
    <div class="item" v-for="item in navs" :key="item.id" @click="goto(item.id)">
      <img :src="item.icon" width="50px" height="50px" />
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .navWarp {
    display: flex;
    flex: 1;
    justify-content: space-around;
    background: white;
  }
  .item-hover {
    background: rgb(244, 244, 244);
  }
  .item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-top: 1rem;
    &:hover {
      &:extend(.item-hover);
    }
  }
</style>

<script>
export default {
  data () {
    return {
      navs: [
        {
          id: 'product',
          icon: require("../assets/Group1.png"),
          name: '产品说明'
        },
        {
          id: 'buy',
          icon: require("../assets/Group2.png"),
          name: '购买教程'
        },
        {
          id: 'exchange',
          icon: require("../assets/Group3.png"),
          name: '兑换教程'
        },
        {
          id: 'detection',
          icon: require("../assets/Group4.png"),
          name: '检测教程'
        }
      ]
    }
  },
  methods: {
    goto (id) {
      this.$router.push("./"+id);
    }
  }
}
</script>
