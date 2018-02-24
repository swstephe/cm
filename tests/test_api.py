# -*- coding: utf8 -*-
import json
import unittest

from google.appengine.ext import testbed
from falcon import testing
from cm.app import api
from cm.db.model import FIELDS
from data import RECORD, UPDATE, load, clear


class APITestCase(testing.TestCase):
    def setUp(self):
        super(APITestCase, self).setUp()
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_memcache_stub()
        self.app = api

    def tearDown(self):
        clear()
        self.testbed.deactivate()

    def testContactsGetAll(self):
        # empty
        result = self.simulate_get('/contacts')
        self.assertEqual(result.json, {'contacts': []})
        # loaded
        contacts = load()
        result = self.simulate_get('/contacts')
        records = result.json['contacts']
        self.assertEqual(len(records), len(contacts))
        for record in records:
            contact = contacts[record['id']]
            for f in FIELDS:
                self.assertEqual(contact[f], record[f])

    def testContactsGet(self):
        contacts = load()
        for k, v in contacts.iteritems():
            result = self.simulate_get('/contacts/{}'.format(k))
            self.assertEqual(200, result.status_code)
            contact = result.json
            self.assertEqual(k, contact['id'])
            for f in FIELDS:
                self.assertEqual(v[f], contact[f])
        result = self.simulate_get('/contacts/999')
        self.assertEqual(400, result.status_code)
        result = self.simulate_get('/contacts/abc')
        self.assertEqual(400, result.status_code)

    def testContactsCreate(self):
        result = self.simulate_post('/contacts', body=json.dumps(RECORD))
        self.assertEqual(200, result.status_code)
        _id = result.json['id']
        result = self.simulate_get('/contacts/{}'.format(_id))
        contact = result.json
        for k, v in RECORD.iteritems():
            self.assertEqual(contact[k], v)

    def testContactUpdate(self):
        result = self.simulate_post('/contacts', body=json.dumps(RECORD))
        self.assertEqual(200, result.status_code)
        _id = result.json['id']
        result = self.simulate_get('/contacts/{}'.format(_id))
        self.assertEqual(200, result.status_code)
        contact = result.json
        for k, v in RECORD.iteritems():
            self.assertEqual(contact[k], v)
        result = self.simulate_patch('/contacts/{}'.format(_id), body=json.dumps(UPDATE))
        self.assertEqual(200, result.status_code)
        result = self.simulate_get('/contacts/{}'.format(_id))
        self.assertEqual(200, result.status_code)
        contact = result.json
        for k, v in UPDATE.iteritems():
            self.assertEqual(contact[k], v)

    def testContactDelete(self):
        result = self.simulate_post('/contacts', body=json.dumps(RECORD))
        self.assertEqual(200, result.status_code)
        _id = result.json['id']
        result = self.simulate_get('/contacts/{}'.format(_id))
        self.assertEqual(200, result.status_code)
        self.assertIsNotNone(result.json)
        result = self.simulate_delete('/contacts/{}'.format(_id))
        self.assertEqual(200, result.status_code)
        result = self.simulate_get('/contacts/{}'.format(_id))
        self.assertEqual(404, result.status_code)
        result = self.simulate_delete('/contacts/{}'.format(_id))
        self.assertEqual(404, result.status_code)


if __name__ == '__main__':
    unittest.main()
