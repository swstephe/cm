#!/usr/bin/env python
# -*- coding: utf-8 -*-
import argparse
import os
import json
import requests


USER = 'zahi.stephens@gmail.com'
CWD = os.path.dirname(os.path.realpath(__file__))
ROOT = os.path.dirname(CWD)
with open(os.path.join(ROOT, 'data', 'contacts.json')) as f:
    CONTACTS = json.load(f)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Load data into CM app")
    parser.add_argument('url', nargs='?', default='http://localhost:8080/', help="Target URL")
    parser.add_argument('--user', '-u', default=USER, help="Username (default %r)"%USER)
    args = parser.parse_args()
    r = requests.get(args.url + '_ah/login?email={}&action=Login&continue={}'.format(args.user, args.url))
    cookie = r.history[0].cookies.get('dev_appserver_login')
    for contact in CONTACTS:
        r = requests.post(
            args.url + 'contacts',
            data=json.dumps(contact),
            cookies={'dev_appserver_login': cookie},
            headers={'content-type': 'application/json'}
        )
        print r
