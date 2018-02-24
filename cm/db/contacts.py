# -*- coding: utf8 -*-
from google.appengine.api import users
from google.appengine.ext import ndb
from cm.config import getLogger
import logging

log = getLogger(__name__)

# if not logged in, auto-login

# navbar
#   - profile menu
# contact details
#   - name              # 1
#   - email (array)     # 2
#   - phone (array)     # 3 (name)
#   - address (array)
#   - birthday


def get_user():
    user = str(users.get_current_user())
    logging.error("user=%r", user)
    return user


class NotFound(Exception):
    def __init__(self, _id):
        super(NotFound, self).__init__(
            "Contact not found for ID ({!r})"
            .format(_id)
        )


class BadParameter(Exception):
    def __init__(self, _id):
        super(BadParameter, self).__init__(
            "ID ({!r})"
            .format(_id)
        )


class Phone(ndb.Model):
    value = ndb.StringProperty()


class Email(ndb.Model):
    value = ndb.StringProperty()


class Contact(ndb.Model):
    user = ndb.StringProperty()
    first = ndb.StringProperty()
    last = ndb.StringProperty()
    phones = ndb.StructuredProperty(Phone, repeated=True)
    emails = ndb.StructuredProperty(Email, repeated=True)

    @classmethod
    def clear(cls):
        for contact in cls.query(cls.user == get_user()):
            contact.key.delete()

    @classmethod
    def get_all(cls):
        return cls.query(cls.user == get_user())

    @classmethod
    def get(cls, _id):
        contact = cls.get_by_id(int(_id))
        if contact is None or contact.user != get_user():
            raise NotFound(_id)
        return contact

    @classmethod
    def create(cls, **kwargs):
        contact = cls(
            user=get_user(),
            first=kwargs['first'],
            last=kwargs['last'],
            phones=list(Phone(value=phone) for phone in kwargs.get('phones', [])),
            emails=list(Email(value=email) for email in kwargs.get('emails', []))
        )
        return str(contact.put().id())

    @classmethod
    def update(cls, _id, **kwargs):
        logging.error("_id=%r", _id)
        logging.error("kwargs=%r", kwargs)
        contact = cls.get(_id)
        if 'first' in kwargs:
            contact.first = kwargs['first']
        if 'last' in kwargs:
            contact.last = kwargs['last']
        if 'phones' in kwargs:
            contact.phones = [Phone(value=phone) for phone in kwargs['phones']]
        if 'emails' in kwargs:
            contact.emails = [Email(value=email) for email in kwargs['emails']]
        contact.put()

    @classmethod
    def delete(cls, _id):
        cls.get(_id).key.delete()
