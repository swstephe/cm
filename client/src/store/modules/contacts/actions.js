import types from './mutation-types'
import contacts from '../../../services/contacts'

export default {
  setContact ({ commit }, contact) {
    commit(types.CONTACTS_SET_CONTACT, contact)
  },

  getContacts ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.CONTACTS_ALL_REQUEST)
      contacts.getContacts()
        .then(response => {
          commit(types.CONTACTS_ALL_SUCCESS, response)
          return resolve()
        })
        .catch(response => {
          console.error(response)
          return reject()
        })
    })
  },

  getContact ({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit(types.CONTACTS_GET_REQUEST)
      contacts.getContact(id)
        .then(contact => {
          commit(types.CONTACTS_GET_SUCCESS, contact)
          return resolve()
        })
    })
  },

  addContact ({ commit }, contact) {
    return new Promise((resolve, reject) => {
      commit(types.CONTACTS_ADD_REQUEST)
      contacts.addContact(contact)
        .then(response => {
          contact.id = response
          commit(types.CONTACTS_ADD_SUCCESS, contact)
          return resolve()
        })
    })
  },

  updateContact ({ commit }, contact) {
    return new Promise((resolve, reject) => {
      commit(types.CONTACTS_UPD_REQUEST)
      contacts.updateContact(contact)
        .then(response => {
          commit(types.CONTACTS_UPD_SUCCESS, contact)
          return resolve()
        })
    })
  },

  deleteContact ({ commit }, contact) {
    return new Promise((resolve, reject) => {
      commit(types.CONTACTS_DEL_REQUEST)
      contacts.deleteContact(contact)
        .then(() => {
          commit(types.CONTACTS_DEL_SUCCESS, contact)
          return resolve()
        })
    })
  }
}
