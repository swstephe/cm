import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Contact} from './model';

@inject(HttpClient)
export class ContactService {
  constructor(httpClient) {
    this.http = httpClient
      .configure(x => {
        x.withBaseUrl('/api/contacts');
        x.withHeader('Content-Type', 'application/json');
      });
  }

  getAllContacts() {
    return this.http.get('')
      .then(response => {
        return response.content.contacts.map(x => { return new Contact(x) })
      });
  }

  getContact(id) {
    return this.http.get(id)
      .then(response => {
        return new Contact(response.content);
      });
  }

  addContact(contact) {
    return this.http.post('', contact.toData())
      .then(response => {
        return new Contact(response.content.obj);
    });
  }

  updateContact(contact) {
    return this.http.patch(contact.id, contact.toData())
      .then(response => {
      return new Contact(response.content.obj);
    });
  }

  deleteContact(contact) {
    return this.http.delete(contact.id)
      .then(response => {
        //
      });
  }
}
