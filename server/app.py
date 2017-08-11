# -*- coding: utf8 -*-
import os
import bottle
import logger
from api import contacts

CWD = os.path.dirname(os.path.realpath(__file__))
GIT = os.path.expanduser('~/git')
ROOT = os.path.join(GIT, 'cm')
API = os.path.join(ROOT, 'api')
CLIENT = os.path.join(ROOT, 'client')
UI = os.path.join(ROOT, 'ui')

log = logger.logging.getLogger(__name__)
app = application = bottle.default_app()
app.mount('/api/contacts', contacts.api)


@app.route('/')
@app.route('/index.html')
def index():
    return bottle.static_file('index.html', root=CLIENT)


@app.route('/api/<path:path>')
def api_static(path):
    return bottle.static_file(path, root=os.path.join(API))


@app.route('/favicon.ico')
def favicon():
    return bottle.static_file('favicon.ico', root=CLIENT)


@app.route('/scripts/<path:path>')
def scripts(path):
    log.debug("/scripts/%s -> %r", path, os.path.join(CLIENT, 'scripts', path))
    return bottle.static_file(path, root=os.path.join(CLIENT, 'scripts'))


@app.route('/src/<path:path>')
def scripts(path):
    log.debug("/src/%s -> %r", path, os.path.join(CLIENT, 'src', path))
    return bottle.static_file(path, root=os.path.join(CLIENT, 'src'))


@app.route('/ui/ui.css')
def ui_css():
    return bottle.static_file('ui.css', root=UI)

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True, reloader=True)
