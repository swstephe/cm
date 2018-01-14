# -*- coding: utf8 -*-
import falcon
from cm.config import getLogger
from cm.middleware.auth0 import AuthMiddleware
from cm.resources.contacts import ContactsResource, ContactNotFound, ContactBadParameter
from cm.db.model import NotFound, BadParameter

log = getLogger(__name__)


def my_error_serializer(req, resp, exception):
    resp.body = exception.to_json()
    resp.content_type = 'application/json'


contacts = ContactsResource()

api = falcon.API() # middleware=[AuthMiddleware()])
api.set_error_serializer(my_error_serializer)
api.add_route('/contacts', contacts)
api.add_route('/contacts/{_id}', contacts)
api.add_error_handler(NotFound, ContactNotFound.handle)
api.add_error_handler(BadParameter, ContactBadParameter.handle)
