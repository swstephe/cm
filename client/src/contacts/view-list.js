import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactService} from './service';
import {ContactUpdated, ContactViewed} from '../messages';

@inject(ContactService, EventAggregator)
export class ContactList {
  constructor(service, eq) {
    this.service = service;
    this.contacts = [];

    eq.subscribe(ContactViewed, msg => this.select(msg.contact));
    eq.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id === id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.service.getAllContacts().then(contacts => this.contacts = contacts);
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;
  }
}
