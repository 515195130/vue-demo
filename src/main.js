// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入全局样式
import '../static/css/global.css'
import '../static/css/iconfont.css'
// 引入阿里图标
import '../static/js/iconfont'

// mint-ui 组件库
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// 引入 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    num: 1
  },
  mutations: {
    addCartCount(state){
      state.num ++
    },
    reduceCartCount(state){
      state.num --
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
