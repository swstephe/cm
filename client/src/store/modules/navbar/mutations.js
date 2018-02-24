import types from './mutation-types'

export default {
  [types.NAVBAR_MODAL_SHOW] (state, modal) {
    state.modal = modal
  }
}
