# -*- coding: utf8 -*-
import unittest

from google.appengine.ext import testbed
from cm.db.model import FIELDS, Contacts, NotFound, BadParameter
from data import RECORD, UPDATE, load


class ContactsTestCase(unittest.TestCase):
    def setUp(self):
        super(ContactsTestCase, self).setUp()
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_memcache_stub()
        self.contacts = Contacts()

    def tearDown(self):
        self.testbed.deactivate()

    def testContactsGetAll(self):
        # empty
        self.assertEqual(self.contacts.get_all(), [])
        # loaded
        contacts = load()
        records = self.contacts.get_all()
        self.assertEqual(len(contacts), len(records))
        for record in records:
            contact = contacts[record.key.id()]
            for f in FIELDS:
                self.assertEqual(contact[f], getattr(record, f))

    def testContactsGet(self):
        contacts = load()
        for k, v in contacts.iteritems():
            contact = self.contacts.get(k)
            self.assertEqual(k, contact.key.id())
            for f in FIELDS:
                self.assertEqual(v[f], getattr(contact, f))
        with self.assertRaises(NotFound):
            self.contacts.get(999)
        with self.assertRaises(BadParameter):
            self.contacts.get('abc')

    def testContactsCreate(self):
        _id = Contacts.create(**RECORD)
        contact = self.contacts.get(_id)
        for k, v in RECORD.iteritems():
            self.assertEqual(getattr(contact, k), v)

    def testContactUpdate(self):
        _id = self.contacts.create(**RECORD)
        contact = self.contacts.get(_id)
        for k, v in RECORD.iteritems():
            self.assertEqual(getattr(contact, k), v)
        self.contacts.update(_id, **UPDATE)
        contact = self.contacts.get(_id)
        for k, v in UPDATE.iteritems():
            self.assertEqual(getattr(contact, k), v)

    def testContactDelete(self):
        _id = self.contacts.create(**RECORD)
        self.assertIsNotNone(self.contacts.get(_id))
        self.contacts.delete(_id)
        with self.assertRaises(NotFound):
            self.contacts.get(_id)
        with self.assertRaises(NotFound):
            self.contacts.delete(_id)


if __name__ == '__main__':
    unittest.main()
