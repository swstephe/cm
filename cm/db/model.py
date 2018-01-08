# -*- coding: utf8 -*-
from google.appengine.ext import ndb
from cm.config import getLogger

log = getLogger(__name__)


class Contacts(ndb.Model):
    first = ndb.StringProperty()
    last = ndb.StringProperty()
    email = ndb.StringProperty()
    phone = ndb.StringProperty()

    @classmethod
    def get_all(cls):
        return cls.query().fetch()

    @classmethod
    def get(cls, _id):
        return ndb.Key('Contacts', _id).get()

    @classmethod
    def create(cls, first, last, email, phone):
        contact = cls(first=first, last=last, email=email, phone=phone)
        contact.put()
        return contact.key.id()

    @classmethod
    def update(cls, _id, first, last, email, phone):
        contact = cls.get(_id)
        contact.first = first
        contact.last = last
        contact.email = email
        contact.phone = phone
        contact.put()

    @classmethod
    def delete(cls, _id):
        contact = cls.get(_id)
        contact.delete()
