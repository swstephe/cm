# -*- coding: utf8 -*-
import falcon
from cm.config import getLogger
from cm.middleware.auth0 import AuthMiddleware
from cm.resources.contacts import ContactsResource

log = getLogger(__name__)

contacts = ContactsResource()

api = falcon.API() # middleware=[AuthMiddleware()])
api.add_route('/contacts', contacts)
api.add_route('/contacts/{_id}', contacts)
