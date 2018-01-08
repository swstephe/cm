# -*- coding: utf8 -*-
from wsgiref.simple_server import make_server
from cm.app import api
from cm.config import getLogger
from cm.resources.static import StaticResource

log = getLogger(__name__)

if __name__ == '__main__':
    api.add_route('/', StaticResource('index.html'))
    api.add_route('/dist/build.js', StaticResource('dist/build.js'), 'text/javascript')
    httpd = make_server('', 8085, api)
    httpd.server_forever()
