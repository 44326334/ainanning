<template>
  <mt-header :title="currentRoute.title" fixed>
    <mt-button slot="left"
    :icon="currentRoute.path === '/'?'search':this.$router.currentRoute.meta.back ?'back':''" @click="back"></mt-button>
    <mt-button slot="right" icon="more" v-show="currentRoute.path === '/'"></mt-button>
  </mt-header>
</template>

<style lang="" scoped>
</style>

<script>
export default {
  data() {
    return {
      currentRoute: {}
    };
  },
  methods: {
    back() {
      if (this.$router.currentRoute.path === '/consume') {
        this.$router.push(this.$route.params)
      } else {
        this.$router.currentRoute.meta.back
        ? this.$router.push(this.$router.currentRoute.meta.backPath)
        : null;
      }
    }
  },
  mounted() {
    let currentPath = this.$router.currentRoute.path;
    let routes = this.$router.options.routes;
    for (let i in routes) {
      routes[i].path === currentPath ? (this.currentRoute = routes[i]) : '';
    }
  }
};
</script>
