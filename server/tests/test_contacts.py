# -*- coding: utf8 -*-
from boddle import boddle
from pymongo import MongoClient
import logger
from mongo_dict import Visitor
from api import contacts
from nose.tools import *

TEST_DOC = {
    'first': 'first',
    'last': 'last',
    'email': 'test@example.com',
    'phone': '555-1212'
}
db = None
visitor = Visitor()
log = logger.getLogger(__name__)


def delete_test_doc():
    db.contacts.delete_one(dict(email=TEST_DOC['email']))


def insert_test_doc():
    delete_test_doc()
    doc = db.contacts.insert_one(TEST_DOC.copy())
    assert_true(doc.acknowledged)
    assert_is_not_none(doc.inserted_id)
    return doc


def setup():
    global db
    client = MongoClient('mongodb://localhost:27017/')
    db = client.contacts


def test_get():
    results = contacts.get_handler(db)
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
    with boddle(method='POST', json=TEST_DOC):
        result = contacts.post_handler(db)
    log.debug("result=%r", result)
    assert_equal('Saved contact', result['message'])
    assert_true(result['obj']['acknowledged'])
    assert_is_not_none(result['obj']['inserted_id'])


def test_get_id():
    doc = db.contacts.find_one()
    log.debug("doc=%r", doc)
    result = contacts.get_id_handler(db, str(doc['_id']))
    log.debug("result=%r", result)
    assert_equal(str(doc['_id']), result['_id'])
    assert_equal(doc['first'], result['first'])
    assert_equal(doc['last'], result['last'])
    assert_equal(doc['email'], result['email'])
    assert_equal(doc['phone'], result['phone'])


def test_patch():
    delete_test_doc()
    doc = db.contacts.insert_one(TEST_DOC.copy())
    assert_true(doc.acknowledged)
    assert_is_not_none(doc.inserted_id)
    new_doc = TEST_DOC.copy()
    new_doc.update(first='James', last='Bond')
    with boddle(method='PATCH', json=new_doc):
        result = contacts.patch_handler(db, str(doc.inserted_id))
    log.debug("result=%r", result)
    assert_is_instance(result, dict)
    assert_equal('Updated contact', result['message'])
    assert_equal(str(doc.inserted_id), result['obj']['_id'])
    assert_equal(new_doc['first'], result['obj']['first'])
    assert_equal(new_doc['last'], result['obj']['last'])
    assert_equal(new_doc['email'], result['obj']['email'])
    assert_equal(new_doc['phone'], result['obj']['phone'])


def test_delete():
    delete_test_doc()
    doc = db.contacts.insert_one(TEST_DOC.copy())
    assert_true(doc.acknowledged)
    assert_is_not_none(doc.inserted_id)
    result = contacts.delete_handler(db, doc.inserted_id)
    log.debug("result=%r", result)
    assert_is_instance(result, dict)
    assert_equal(result['message'], 'Deleted contact')
    assert_is_instance(result['result'], dict)
    assert_true(result['result']['acknowledged'])
    assert_equal(1, result['result']['deleted_count'])
    doc2 = db.contacts.find_one({'id': doc.inserted_id})
    assert_is_none(doc2)
