import axios from 'axios'
import store from '../store'

function makeHeaders() {
  let token = store.store.auth0.idToken
  if (token == null) { return {}}
  return {
    headers: {
      Authorization: "Bearer " + token
    }
  }
}

export function getContacts () {
  return axios.get('/contacts', makeHeaders())
}

export function getContact (id) {
  return axios.get('/contacts/' + id, makeHeaders())
}

export function addContact (contact) {
  return axios.post('/contacts', contact, makeHeaders())
}

export function updateContact (contact) {
  return axios.patch('/contacts/' + contact.id, contact, makeHeaders())
}

export function deleteContact (id) {
  return axios.delete('/contacts/' + id, makeHeaders())
}