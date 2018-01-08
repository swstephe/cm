import axios from 'axios'
import store from '../store'

export function getContacts (cb) {
  let token = store.state.auth0.idToken
  axios.get('/contacts', {headers: { Authorization: "Bearer " + token }})
  .then(response => { cb(response.data) })
  .catch(error => { console.error(error) })
}

export function getContact (cb, {id}) {
  let token = store.state.auth0.idToken
  axios.get('/contacts/' + id, { headers: { Authorization: "Bearer " + token }})
  .then(response => { cb(response.data) })
  .catch(error => { console.error(error) })
}

export function addContact (cb, { first, last, email, phone }) {
  let token = store.state.auth0.idToken
  axios.post('/contacts', { headers: { Authorization: "Bearer " + token }})
  .then(response => { cb(response.data) })
  .catch(error => { console.error(error) })
}

export function updateContact (cb, { id, first, last, email, phone }) {
  let token = store.state.auth0.idToken
  axios.patch('/contacts/' + id, { headers: { Authorization: "Bearer " + token }})
  .then(response => { cb(response.data) })
  .catch(error => { console.error(error) })
}

export function deleteContact (cb, { id }) {
  let token = store.state.auth0.idToken
  axios.delete('/contacts/' + id, { headers: { Authorization: "Bearer " + token }})
  .then(response => { cb(response.data) })
  .catch(error => { console.error(error) })
}