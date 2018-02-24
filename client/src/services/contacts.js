import axios from 'axios'

function convert(contact) {
  return {
    first: contact.first,
    last: contact.last,
    phones: contact.phones.map(elem => elem.value),
    emails: contact.emails.map(elem => elem.value)
  }
}

export default {
  getContacts () {
    return new Promise((resolve, reject) => {
      axios.get('/contacts')
        .then((response) => {
          resolve(response.data.contacts)
        })
        .catch((response) => {
          console.error(response)
          reject(new Error('got status ' + response.statusCode + ' from server'))
        })
    })
  },

  addContact (contact) {
    return new Promise((resolve, reject) => {
      axios.post('/contacts', convert(contact))
        .then((response) => {
          resolve(response.data)
        })
        .catch((response) => {
          reject(new Error('got status ' + response.statusCode + ' from server'))
        })
    })
  },

  updateContact (contact) {
    return new Promise((resolve, reject) => {
      axios.patch('/contacts/' + contact.id, convert(contact))
        .then((response) => {
          resolve(response.data)
        })
        .catch((response) => {
          reject(new Error('got status ' + response.statusCode + ' from server'))
        })
    })
  },

  deleteContact (contact) {
    return new Promise((resolve, reject) => {
      axios.delete('/contacts/' + contact.id)
        .then((response) => {
          resolve(response.data)
        })
        .catch((response) => {
          reject(new Error('got status ' + response.statusCode + ' from server'))
        })
    })
  }
}
