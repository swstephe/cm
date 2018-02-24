# -*- coding: utf8 -*-
import falcon
from cm.db import contacts

def record(contact):
    if contact is None:
        return None
    return dict(
        id=str(contact.key.id()),
        first=contact.first,
        last=contact.last,
        phones=list(phone.value for phone in contact.phones),
        emails=list(email.value for email in contact.emails)
    )


class NotFound(contacts.NotFound):
    @staticmethod
    def handle(ex, req, resp, params):
        raise falcon.HTTPNotFound(title=ex.message)


class BadParameter(contacts.BadParameter):
    @staticmethod
    def handle(ex, req, resp, params):
        raise falcon.HTTPInvalidParam(msg=ex.message, param_name='id')


class Contacts(object):
    def on_get(self, req, resp, _id=None):
        if _id is None:
            resp.media = dict(
                contacts=list(
                    record(contact)
                    for contact in contacts.Contact.get_all()
                )
            )
        else:
            resp.media = record(contacts.Contact.get(_id))

    def on_post(self, req, resp):
        resp.media = contacts.Contact.create(**req.media)

    def on_patch(self, req, resp, _id):
        contacts.Contact.update(_id, **req.media)

    def on_delete(self, req, resp, _id):
        contacts.Contact.delete(_id)
