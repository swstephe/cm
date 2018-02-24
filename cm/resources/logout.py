# -*- coding: utf8 -*-
import falcon
from google.appengine.api import users

class Logout(object):
    def on_get(self, req, resp):
        url = users.create_logout_url('/')
        raise falcon.HTTPFound(url)
