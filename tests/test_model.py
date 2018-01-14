# -*- coding: utf8 -*-
import unittest

from google.appengine.ext import ndb
from google.appengine.ext import testbed
from cm.db.model import FIELDS, Contacts, NotFound, BadParameter
from data import RECORD, UPDATE, load


class ContactsTestCase(unittest.TestCase):
    def setUp(self):
        super(ContactsTestCase, self).setUp()
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        ndb.get_context().clear_cache()

    def tearDown(self):
        self.testbed.deactivate()

    def testContactsGetAll(self):
        # empty
        self.assertEqual(Contacts.get_all(), [])
        # loaded
        contacts = load()
        records = Contacts.get_all()
        self.assertEqual(len(contacts), len(records))
        for record in records:
            contact = contacts[record.key.id()]
            for f in FIELDS:
                self.assertEqual(contact[f], getattr(record, f))

    def testContactsGet(self):
        contacts = load()
        for k, v in contacts.iteritems():
            contact = Contacts.get(k)
            self.assertEqual(k, contact.key.id())
            for f in FIELDS:
                self.assertEqual(v[f], getattr(contact, f))
        with self.assertRaises(NotFound):
            Contacts.get(999)
        with self.assertRaises(BadParameter):
            Contacts.get('abc')

    def testContactsCreate(self):
        _id = Contacts.create(**RECORD)
        contact = Contacts.get(_id)
        for k, v in RECORD.iteritems():
            self.assertEqual(getattr(contact, k), v)

    def testContactUpdate(self):
        _id = Contacts.create(**RECORD)
        contact = Contacts.get(_id)
        for k, v in RECORD.iteritems():
            self.assertEqual(getattr(contact, k), v)
        Contacts.update(_id, **UPDATE)
        contact = Contacts.get(_id)
        for k, v in UPDATE.iteritems():
            self.assertEqual(getattr(contact, k), v)

    def testContactDelete(self):
        _id = Contacts.create(**RECORD)
        self.assertIsNotNone(Contacts.get(_id))
        Contacts.delete(_id)
        with self.assertRaises(NotFound):
            Contacts.get(_id)
        with self.assertRaises(NotFound):
            Contacts.delete(_id)


if __name__ == '__main__':
    unittest.main()
