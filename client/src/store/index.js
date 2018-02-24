import Vue from 'vue'
import Vuex from 'vuex'

import contacts from './modules/contacts'
import navbar from './modules/navbar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    contacts,
    navbar
  }
})

export default store
