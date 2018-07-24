import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      title: '健康检测应用',
      component: resolve => {
        require(['@/views/container/index.vue'], resolve)
      },
      meta: {
        back: false
      }
    },
    {
      path: '/product',
      name: 'product',
      title: '产品说明',
      component: resolve => {
        require(['@/views/container/product.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/'
      }
    },
    {
      path: '/buy',
      name: 'buy',
      title: '购买教程',
      component: resolve => {
        require(['@/views/container/buy.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/'
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      title: '兑换教程',
      component: resolve => {
        require(['@/views/container/exchange.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/'
      }
    },
    {
      path: '/detection',
      name: 'detection',
      title: '检测教程',
      component: resolve => {
        require(['@/views/container/detection.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/'
      }
    },
    {
      path: '/infos',
      name: 'infos',
      title: '用户填写',
      component: resolve => {
        require(['@/views/container/infos.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/product'
      }
    },
    {
      path: '/payment',
      name: 'payment',
      title: '支付确认',
      component: resolve => {
        require(['@/views/container/payment.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/infos'
      }
    },
    {
      path: '/complied',
      name: 'complied',
      title: '支付完成',
      component: resolve => {
        require(['@/views/container/complied.vue'], resolve)
      },
      meta: {
        back: false
      }
    },
    {
      path: '/checkrecord',
      name: 'checkrecord',
      title: '购买查询',
      component: resolve => {
        require(['@/views/container/checkrecord.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/product'
      }
    },
    {
      path: '/record',
      name: 'record',
      title: '购买记录',
      component: resolve => {
        require(['@/views/container/record.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/checkrecord'
      }
    },
    {
      path: '/consume',
      name: 'consume',
      title: '卡券详情',
      component: resolve => {
        require(['@/views/container/consume.vue'], resolve)
      },
      meta: {
        back: true
      }
    },
    {
      path: '/mailaddress',
      name: 'mailaddress',
      title: '信息填写',
      component: resolve => {
        require(['@/views/container/mailaddress'], resolve)
      },
      meta: {
        back: true,
        backPath: '/consume'
      }
    },
    {
      path: '/accomplish',
      name: 'accomplish',
      title: '',
      component: resolve => {
        require(['@/views/container/accomplish'], resolve)
      },
      meta: {
        back: true,
        backPath: '/mailaddress'
      }
    }
  ]
})
