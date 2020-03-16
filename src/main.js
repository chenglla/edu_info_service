// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import vueTap from 'vue-js-tap'
// import FastClick from 'fastclick'
import axios from 'axios'
import store from './store'
import { Search, Popup, Popover } from 'vux'

Vue.component('popup', Popup)
Vue.component('popover', Popover)
Vue.component('search', Search)
Vue.use(vueTap)
Vue.use(VueRouter)
// FastClick.attach(document.body)
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
