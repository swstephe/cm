import { Contact } from '../../../model/contact'
import types from './mutation-types'

export default {
  [types.CONTACTS_SET_CONTACT] (state, contact) {
    state.selected = contact ? contact.index : -1
  },

  [types.CONTACTS_ALL_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_ALL_FAILURE] (state, { error }) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_ALL_SUCCESS] (state, contacts) {
    state.contacts = contacts.map(elem => new Contact(elem))
    state.error = null
    state.isRequesting = false
  },

  [types.CONTACTS_GET_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_GET_FAILURE] (state, error) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_GET_SUCCESS] (state, contact) {
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

  [types.CONTACTS_ADD_SUCCESS] (state, contact) {
    state.error = null
    state.isRequesting = false
    contact.index = state.contacts.length
    state.contacts.push(new Contact(contact))
  },

  [types.CONTACTS_UPD_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_UPD_FAILURE] (state, { error }) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_UPD_SUCCESS] (state, contact) {
    state.error = null
    state.isRequesting = false
    state.contacts[state.selected].copy(contact)
  },
  [types.CONTACTS_DEL_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.CONTACTS_DEL_FAILURE] (state, { error }) {
    state.error = error
    state.isRequesting = false
  },

  [types.CONTACTS_DEL_SUCCESS] (state, contact) {
    state.error = null
    state.isRequesting = false
    state.contacts.splice(contact.index, 1)
    state.contacts.forEach(elem => {
      if (elem.index > contact.index) {
        elem.index--
      }
    })
  }
}
