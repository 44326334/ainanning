<template>
  <mt-swipe :auto="4000" ref="imgwarp" :style="{height: warpHeight + 'px'}">
    <mt-swipe-item v-for="item in imgs" :key="item.id">
      <img :src="item.url" class="img" width="100%" ref="img"/>
    </mt-swipe-item>
  </mt-swipe>
</template>

<style lang="" scoped>
.mint-swipe {
  /* height: 150px; */
}
</style>

<script>
export default {
  data () {
    return {
      imgs: [
        {
          url: require('../assets/img1.png')
        },
        {
          url: require('../assets/img1.png')
        },
        {
          url: require('../assets/img1.png')
        }
      ],
      warpHeight: null,
      bodyWidth: null,
      bodyHeight: null
    }
  },
  methods: {},
  mounted () {
    this.bodyWidth = document.body.clientWidth
    this.bodyHeight = document.body.clientHeight
    const scale = this.bodyWidth / 1080
    const warpHeight = scale * 520
    // const imgwarp = this.$refs.imgwarp.$el
    // console.log(window.getComputedStyle(imgwarp))
    this.warpHeight = warpHeight
  }
}
</script>
