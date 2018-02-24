import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  isRequesting: false,
  error: null,
  selected: -1,
  contacts: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
