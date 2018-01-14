# -*- coding: utf8 -*-
import falcon
from cm.config import getLogger
from cm.db import model

log = getLogger(__name__)


def record(contact):
    if contact is None:
        return None
    return {
        'id': contact.key.id(),
        'first': contact.first,
        'last': contact.last,
        'email': contact.email,
        'phone': contact.phone
    }


class ContactNotFound(model.NotFound):
    @staticmethod
    def handle(ex, req, resp, params):
        raise falcon.HTTPNotFound(title=ex.title, description=ex.message)


class ContactBadParameter(model.BadParameter):
    @staticmethod
    def handle(ex, req, resp, params):
        raise falcon.HTTPInvalidParam(msg=ex.message, param_name='id')


class ContactsResource(object):
    def on_get(self, req, resp, _id=None):
        if _id is None:
            resp.media = {
                'contacts': list(
                    record(contact)
                    for contact in model.Contacts.get_all()
                )
            }
        else:
            resp.media = record(model.Contacts.get(_id))

    def on_post(self, req, resp):
        data = dict(req.media.items())
        data['id'] = model.Contacts.create(**data)
        resp.media = data

    def on_patch(self, req, resp, _id):
        data = dict(req.media.items())
        model.Contacts.update(_id, **data)

    def on_delete(self, req, resp, _id):
        model.Contacts.delete(_id)
