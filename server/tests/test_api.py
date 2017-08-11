# -*- coding: utf8 -*-
from pymongo import MongoClient
from webtest import TestApp
from app import application
import logger
from nose.tools import *


TEST_DOC = {
    'first': 'first',
    'last': 'last',
    'email': 'test@example.com',
    'phone': '555-1212'
}
db = None
app = TestApp(application)
log = logger.getLogger(__name__)


def delete_test_doc():
    db.contacts.delete_one(dict(email=TEST_DOC['email']))


def find_test_doc():
    return db.contacts.find_one({'email': TEST_DOC['email']})


def insert_test_doc():
    delete_test_doc()
    doc = db.contacts.insert_one(TEST_DOC.copy())
    assert_true(doc.acknowledged)
    assert_is_not_none(doc.inserted_id)
    return doc


def setup():
    global app, db
    app = TestApp(application)
    client = MongoClient('mongodb://localhost:27017/')
    db = client.contacts


def teardown():
    delete_test_doc()


def test_get():
    resp = app.get('/api/contacts')
    assert_equal(200, resp.status_int)
    assert_equal('application/json', resp.content_type)
    results = resp.json
    log.debug("results=%r", results)
    assert_is_instance(results, dict)
    assert_in('message', results)
    assert_equal('Success', results['message'])
    assert_in('contacts', results)
    assert_is_instance(results['contacts'], list)
    for contact in results['contacts']:
        assert_is_instance(contact, dict)
        assert_in('_id', contact)
        assert_in('first', contact)
        assert_in('last', contact)
        assert_in('email', contact)
        assert_in('phone', contact)


def test_post():
    delete_test_doc()
    assert_is_none(db.contacts.find_one({'email': TEST_DOC['email']}))
    resp = app.post_json('/api/contacts', TEST_DOC)
    assert_equal(200, resp.status_int)
    assert_equal('application/json', resp.content_type)
    result = resp.json
    log.debug("result=%r", result)
    assert_equal('Saved contact', result['message'])
    assert_true(result['obj']['acknowledged'])
    assert_is_not_none(result['obj']['inserted_id'])
    assert_is_not_none(find_test_doc())


def test_get_id():
    doc = db.contacts.find_one()
    resp = app.get('/api/contacts/{}'.format(doc['_id']))
    assert_equal(200, resp.status_int)
    assert_equal('application/json', resp.content_type)
    result = resp.json
    log.debug("result=%r", result)
    assert_equal(str(doc['_id']), result['_id'])
    assert_equal(doc['first'], result['first'])
    assert_equal(doc['last'], result['last'])
    assert_equal(doc['email'], result['email'])
    assert_equal(doc['phone'], result['phone'])


def test_patch():
    doc = insert_test_doc()
    new_doc = TEST_DOC.copy()
    new_doc.update(first='James', last='Bond')
    resp = app.patch_json('/api/contacts/{}'.format(doc.inserted_id), new_doc)
    assert_equal(200, resp.status_int)
    assert_equal('application/json', resp.content_type)
    result = resp.json
    log.debug('result=%r', result)
    assert_is_instance(result, dict)
    assert_equal('Updated contact', result['message'])
    assert_equal(str(doc.inserted_id), result['obj']['_id'])
    assert_equal(new_doc['first'], result['obj']['first'])
    assert_equal(new_doc['last'], result['obj']['last'])
    assert_equal(new_doc['email'], result['obj']['email'])
    assert_equal(new_doc['phone'], result['obj']['phone'])


def test_delete():
    doc = insert_test_doc()
    resp = app.delete('/api/contacts/{}'.format(doc.inserted_id))
    assert_equal(200, resp.status_int)
    assert_equal('application/json', resp.content_type)
    result = resp.json
    log.debug('result=%r', result)
    assert_equal(result['message'], 'Deleted contact')
    assert_is_instance(result['result'], dict)
    assert_true(result['result']['acknowledged'])
    assert_equal(1, result['result']['deleted_count'])
    assert_is_none(find_test_doc())
