# -*- coding: utf8 -*-
from google.appengine.ext import ndb
from cm.config import getLogger

log = getLogger(__name__)

FIELDS = ('first', 'last', 'email', 'phone')


class ModelException(Exception):
    def __init__(self, title, message):
        super(ModelException, self).__init__(message)
        self.title = title


class NotFound(ModelException):
    def __init__(self, _id):
        super(NotFound, self).__init__(
            "contact not found",
            "Contact not found for 'id' parameter ({!r})".format(_id)
        )


class BadParameter(ModelException):
    def __init__(self, _id):
        super(BadParameter, self).__init__(
            "ID must be numeric",
            "id ({!r})".format(_id)
        )


class Contacts(ndb.Model):
    first = ndb.StringProperty()
    last = ndb.StringProperty()
    email = ndb.StringProperty()
    phone = ndb.StringProperty()

    @classmethod
    def id_param(cls, _id):
        try:
            return int(_id)
        except ValueError:
            raise BadParameter(_id)

    @classmethod
    def get_all(cls):
        return cls.query().fetch()

    @classmethod
    def get(cls, _id):
        contact = ndb.Key('Contacts', cls.id_param(_id)).get()
        if contact is None:
            raise NotFound(_id)
        return contact

    @classmethod
    def create(cls, first, last, email, phone):
        contact = cls(first=first, last=last, email=email, phone=phone)
        contact.put()
        return contact.key.id()

    @classmethod
    def update(cls, _id, **kwargs):
        contact = cls.get(cls.id_param(_id))
        if contact is None:
            raise NotFound(_id)
        for f in FIELDS:
            if f in kwargs:
                setattr(contact, f, kwargs[f])
        contact.put()

    @classmethod
    def delete(cls, _id):
        contact = cls.get(cls.id_param(_id))
        if contact is None:
            raise NotFound(_id)
        contact.key.delete()
