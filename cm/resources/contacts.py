# -*- coding: utf8 -*-
from cm.config import getLogger
from cm.db import model

log = getLogger(__name__)


def record(contact):
    if contact is None:
        return None
    return {
        'id': contact.id(),
        'first': contact.first,
        'last': contact.last,
        'email': contact.email,
        'phone': contact.phone
    }


class ContactsResource(object):
    def on_get(self, req, resp, _id=None):
        log.info("ContactsResource.on_get")
        if _id is None:
            resp.media = {
                'contacts': list(
                    record(contact)
                    for contact in model.Contacts.get_all()
                )
            }
        else:
            resp.media = record(model.Contacts.get(_id))

    def on_post(self, req, resp, _id):
        first = req.media.get('first')
        last = req.media.get('last')
        email = req.media.get('email')
        phone = req.media.get('phone')
        _id = model.Contacts.create(first, last, email, phone)
        resp.media = {
            'id': _id,
            'first': first,
            'last': last,
            'phone': phone
        }

    def on_patch(self, req, resp, _id):
        first = req.media.get('first')
        last = req.media.get('last')
        email = req.media.get('email')
        phone = req.media.get('phone')
        model.Contacts.update(_id, first, last, email, phone)

    def on_delete(self, req, resp, _id):
        model.Contacts.delete(_id)
