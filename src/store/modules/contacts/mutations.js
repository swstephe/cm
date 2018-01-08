import * as types from './mutation-types'

export default {
  [types.CONTACTS_ALL_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_ALL_FAILURE] (state, { error }) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_ALL_SUCCESS] (state, { contacts }) {
    state.contacts = contacts
    state.error = null
    state.isRequesting = false
  },

  [types.CONTACTS_GET_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_GET_FAILURE] (state, { error }) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_GET_SUCCESS] (state, { contact }) {
    state.contact = contact
    state.error = null
    state.isRequesting = false
  },

  [types.CONTACTS_ADD_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_ADD_FAILURE] (state, { error }) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_ADD_SUCCESS] (state) {
    state.error = null
    state.isRequesting = false
  },
  [types.CONTACTS_UPD_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_UPD_FAILURE] (state, { error }) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_UPD_SUCCESS] (state) {
    state.error = null
    state.isRequesting = false
  },
  [types.CONTACTS_DEL_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_DEL_FAILURE] (state, { error }) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_DEL_SUCCESS] (state) {
    state.contact = null
    state.error = null
    state.isRequesting = false
  },
}