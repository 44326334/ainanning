import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/container/index.vue'
import product from '@/views/container/product.vue'
import buy from '@/views/container/buy.vue'
import exchange from '@/views/container/exchange.vue'
import detection from '@/views/container/detection.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      title: '健康检测应用',
      component: index
    },
    {
      path: '/product',
      name: 'product',
      title: '产品说明',
      component: product
    },
    {
      path: '/buy',
      name: 'buy',
      title: '购买教程',
      component: buy
    },
    {
      path: '/exchange',
      name: 'exchange',
      title: '兑换教程',
      component: exchange
    },
    {
      path: '/detection',
      name: 'detection',
      title: '检测教程',
      component: detection
    }
  ]
})
