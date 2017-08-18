import {Container} from 'aurelia-dependency-injection';
import {Contact} from '../../../src/contacts/model';
import {ContactService} from '../../../src/contacts/service';

describe('ContactService', () => {
  let container;
  let contactService;

  beforeEach(() => {
    container = new Container();
    contactService = container.get(ContactService);
  });

  describe('.getAllContacts', () => {
    it('gets all contacts from mongo', () => {
      let results = contactService.getAllContacts();
      expect(results).toBeDefined();
      expect(results.message).toBeDefined();
      expect(results.message).toEqual("Success");
      expect(results.contacts).toBeDefined();
      expect(results.contacts).toBeDefined();
      results.contacts.forEach(function(contact) {
        expect(contact).instanceOf(object);
        expect(contact._id).toBeDefined();
        expect(contact.first).toBeDefined();
        expect(contact.last).toBeDefined();
        expect(contact.email).toBeDefined();
        expect(contact.phone).toBeDefined();
      });
    })
  });
});
