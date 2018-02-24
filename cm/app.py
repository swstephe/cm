# -*- coding: utf8 -*-
import falcon
from cm.config import getLogger
from cm.db import contacts as db
from cm.resources.contacts import Contacts, NotFound, BadParameter
from cm.resources.logout import Logout

log = getLogger(__name__)


def my_error_serializer(req, resp, exception):
    resp.body = exception.to_json()
    resp.content_type = 'application/json'


contacts = Contacts()
logout = Logout()

api = falcon.API()
api.set_error_serializer(my_error_serializer)
api.add_route('/contacts', contacts)
api.add_route('/contacts/{_id}', contacts)
api.add_route('/logout', logout)
api.add_error_handler(db.NotFound, NotFound.handle)
api.add_error_handler(db.BadParameter, BadParameter.handle)
