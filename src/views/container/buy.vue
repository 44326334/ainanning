<template>
  <div>
    <HEADER></HEADER>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
import HEADER from '@/components/header.vue'
YBB.hybrid.navigation.hide();
export default {
  name: 'buy',
  components: { HEADER },
  data () {
    return {

    }
  }
}
</script>
