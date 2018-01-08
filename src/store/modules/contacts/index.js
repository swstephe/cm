import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  isRequesting: false,
  error: null,
  contact: {id: 0, first: '', last: '', email: '', phone: ''},
  contacts: []
}

export default {
  state,
  getters,
  actions,
  mutations
}