import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    carded: {
      name: '1',
      sum: null,
      price: 10.00,
      phone: null,
      code: null,
      payed: false
    },
    order: {},
    // WXresult: {},
    recordlist: {},
    response: {},
    error: {},
    /* consume */
    consume: {
      name: '1',
      phone: null,
      code: null,
      payed: false
    },
    infos: {}
  },
  mutations: {
    buyCard (state, { name, sum, phone, code, payed }) {
      state.carded.name = name
      state.carded.sum = sum
      state.carded.phone = phone
      state.carded.code = code
      state.carded.payed = payed
    },
    createOrder (state, orders) {
      state.order = orders
    },
    // WXresult (state, res) {
    //   state.WXresult = res
    // },
    checkrecord (state, res) {
      state.recordlist = res
    },
    /* consume */
    validateCard (state, { name, phone, code, payed }) {
      state.consume.name = name
      state.consume.phone = phone
      state.consume.code = code
      state.consume.payed = payed
    },
    createInfos (state, infos) {
      state.infos = infos
    }
  },
  actions: {}
})

export default store
