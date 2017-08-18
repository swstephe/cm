export class Contact {
  id;
  first = '';
  last = '';
  email = '';
  phone = '';

  constructor(data) {
    this.id = data._id;
    this.first = data.first;
    this.last = data.last;
    this.email = data.email;
    this.phone = data.phone;
  }

  toData() {
    return {
      first: this.first,
      last: this.last,
      email: this.email,
      phone: this.phone
    };
  }
}
