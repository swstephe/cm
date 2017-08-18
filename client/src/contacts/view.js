import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {areEqual} from '../utility';
import {ContactService} from './service';
import {ContactUpdated, ContactViewed} from '../messages';

@inject(ContactService, EventAggregator)
export class ContactDetail {
  constructor(service, ea) {
    this.service = service;
    this.ea = ea;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.service.getContact(params.id).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.first);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactViewed(this.originalContact));
    });
  }

  get canSave() {
    return this.contact.first && this.contact.last && !this.service.http.isRequesting;
  }

  save() {
    this.service.updateContact(this.contact).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.first);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactUpdated(this.contact));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes.  Are you sure you wish to leave?');

      if(!result) {
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }
}
