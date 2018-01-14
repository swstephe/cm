# -*- coding: utf8 -*-
import os
import json
from cm.db.model import FIELDS, Contacts

CWD = os.path.dirname(os.path.realpath(__file__))
CONTACTS = json.load(
    open(os.path.join(CWD, 'contacts.json'))
)
RECORD = dict(
    first='Scott',
    last='Tiger',
    email='Scott.Tiger@email.com',
    phone='408 555-1212'
)
UPDATE = dict(
    first='Bill',
    last='Lion',
    email='Bill.Lion@email.com',
    phone='480 111-1111'
)


def fields_from_dict(source):
    return dict((f, source[f]) for f in FIELDS)


def fields_from_record(record):
    return dict((f, getattr(record, f)) for f in FIELDS)


def load():
    contacts = {}
    for record in CONTACTS:
        fields = fields_from_dict(record)
        _id = Contacts.create(**fields)
        if _id in contacts:
            raise RuntimeError("duplicate id values:%r" % _id)
        contacts[_id] = fields
    return contacts
