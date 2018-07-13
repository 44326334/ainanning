<template>
  <mt-header :title="currentRoute.title" fixed>
    <mt-button slot="left" :icon="currentRoute.path === '/'?'search':'back'" @click="back"></mt-button>
    <mt-button slot="right" icon="more"></mt-button>
  </mt-header>
</template>

<style lang="" scoped>

</style>

<script>
export default {
  data () {
    return {
      currentRoute: {}
    }
  },
  methods: {
    back () {
      this.currentRoute.path !== '/'?this.$router.push('/'):null
    }
  },
  mounted () {
    let currentPath = this.$router.currentRoute.path
    let routes = this.$router.options.routes
    for (let i in routes) {
      routes[i].path === currentPath?this.currentRoute = routes[i]:''
    }
  }
}
</script>
