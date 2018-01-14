import * as contacts from '@/services/contacts';

describe('services.contacts', () => {
  describe('getContacts', () => {
    it('gets all contacts from api', () => {
      let results = contacts.getContacts();
      console.log("results")
      console.log(results)
    })
  });
});
