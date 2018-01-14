import * as types from './mutation-types'
import * as contacts from '../../../services/contacts'

export const getContacts = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit(types.CONTACTS_ALL_REQUEST)
    contacts.getContacts()
    .then(response => {
      commit(types.CONTACTS_ALL_SUCCESS, response)
      return resolve()
    })
  })
}

export const getContact = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    commit(types.CONTACTS_GET_REQUEST)
    contacts.getContact(id)
    .then(response => {
      commit(types.CONTACTS_GET_SUCCESS, response)
      return resolve()
    })
  })
}

export const addContact = ({ commit }, contact) => {
  return new Promise((resolve, reject) => {
    commit(types.CONTACTS_ADD_REQUEST)
    contacts.addContact(contact)
    .then(response => {
      commit(types.CONTACTS_ADD_SUCCESS, response)
      return resolve()
    })
  })
}

export const updateContact = ({ commit }, contact) => {
  return new Promise((resolve, reject) => {
    commit(types.CONTACTS_UPD_REQUEST)
    contacts.updateContact(contact)
    .then(contact => {
      commit(types.CONTACTS_UPD_SUCCESS, contact)
      return resolve()
    })
  })
}

export const deleteContact = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    commit(types.CONTACTS_DEL_REQUEST)
    contacts.deleteContact(id)
    .then(() => {
      commit(types.CONTACTS_DEL_SUCCESS)
      return resolve()
    })
  })
}