import types from './mutation-types'

export default {
  showModal ({ commit }, modal) {
    commit(types.NAVBAR_MODAL_SHOW, modal)
  }
}
