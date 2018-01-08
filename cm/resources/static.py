# -*- coding: utf8 -*-
import os
import falcon
from cm.config import getLogger, ROOT

log = getLogger(__name__)


class StaticResource(object):
    def __init__(self, filename, content_type='text/html; charset=utf-8'):
        self.filename = os.path.join(ROOT, filename)
        self.content_type = content_type

    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = self.content_type
        with open(self.filename, 'rb') as f:
            resp.body = f.read()
