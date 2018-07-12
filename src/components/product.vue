<template>
  <div class="warp">
    <p>{{title}}</p>
    <div class="con">
      <div class="item" v-for="item in products" :key="item.id">
        <img :src="item.url" alt="" width="100%">
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.warp{
  background: white;
  margin-top: 5px;
  p{
    text-align: left;
    margin: 0;
    font-size: 1.3rem;
    padding: 1rem;
  }
  .con{
    display: flex;
    flex: 1;
    justify-content: space-around;
    flex-wrap: wrap;
    .item{
      width: 48%;
      margin: 1%;
    }
  }

}
</style>

<script>
export default {
  data () {
    return {
      title: '产品展示',
      products: [
        {
          url: require("../assets/logo.png")
        },
        {
          url: require("../assets/logo.png")
        },
        {
          url: require("../assets/logo.png")
        },
        {
          url: require("../assets/logo.png")
        }
      ]
    }
  }
}
</script>
