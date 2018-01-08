import store from '../store'

let next_id = 0

const contacts = [
  {
    id: ++next_id,
    first:'John',
    last:'Tolkien',
    email:'tolkien@inklings.com',
    phone:'867-5309'
  },
  {
    id: ++next_id,
    first:'Clive',
    last:'Lewis',
    email:'lewis@inklings.com',
    phoner:'867-5309'
  },
  {
    id: ++next_id,
    first:'Owen',
    last:'Barfield',
    email:'barfield@inklings.com',
    phone:'867-5309'
  },
  {
    id: ++next_id,
    first:'Charles',
    last:'Williams',
    email:'williams@inklings.com',
    phoner:'867-5309'
  },
  {
    id: ++next_id,
    first:'Roger',
    lastN:'Green',
    email:'green@inklings.com',
    phone:'867-5309'
  }
];

export function getContacts (cb) {
  cb(contacts)
}

export function getContact (id, cb) {
  contacts.forEach(contact => {
    if (contact.id === parseInt(id)) cb(contact)
  })
}

export function addContact (cb, { first, last, email, phone }) {
  contacts.push({id: ++next_id, first, last, email, phone})
}

export function updateContact (cb, { id, first, last, email, phone }) {
  getContact(id, contact => {
    contact.first = first
    contact.last = last
    contact.email = email
    contact.phone = phone
  })
}

export function deleteContact (id, cb) {
  let rem = -1
  for (let i=0; i<contacts.length; i++) {
    if (contacts[i].id === id) {
      rem = i;
      break
    }
  }
  if (rem !== -1)
    contacts.splice(rem, 1)
}