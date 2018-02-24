export class Contact {
  constructor (other) {
    this.clear()
    if (other) {
      this.copy(other)
    }
  }

  clear () {
    this.id = null
    this.first = ''
    this.last = ''
    this.phones = []
    this.emails = []
  }

  compare (other) {
    let cmp = this.first.toUpperCase().localeCompare(other.first.toUpperCase())
    if (cmp !== 0) return cmp
    return this.last.toUpperCase().localeCompare(other.last.toUpperCase())
  }

  copy (other) {
    this.clear()
    this.id = other.id
    this.first = other.first
    this.last = other.last
    for (let phone of other.phones) {
      this.phones.push(
        typeof(phone) === "string"
          ? { value: phone }
          : { value: phone.value }
      )
    }
    for (let email of other.emails) {
      this.emails.push(
        typeof(email) === "string"
          ? { value: email }
          : email
      )
    }
  }

  get initials () {
    return (this.first.substr(0, 1) || '?')
      + (this.last.substr(0, 1) || '?')
  }
}
