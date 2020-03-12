import Vue from 'vue'
import Vuex from 'vuex'
import infoService from './infoService'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    infoService
  }
})

export default store
