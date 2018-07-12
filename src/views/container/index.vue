<template>
  <div>
    <HEADER></HEADER>
    <CAROUSEL></CAROUSEL>
    <NAV></NAV>
    <PRODUCT></PRODUCT>
    <TABBAR></TABBAR>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
import HEADER from '@/components/header.vue'
import CAROUSEL from '@/components/carousel.vue'
import NAV from '@/components/nav.vue'
import PRODUCT from '@/components/product.vue'
import TABBAR from '@/components/tabbar.vue'
export default {
  name: 'index',
  components: {HEADER, CAROUSEL, NAV, PRODUCT, TABBAR},
  data () {
    return {}
  }
}
</script>
