#!/usr/bin/env python
# -*- coding: utf-8 -*-
import argparse
import os
import json
import requests


CWD = os.path.dirname(os.path.realpath(__file__))
ROOT = os.path.dirname(CWD)
with open(os.path.join(ROOT, 'tests', 'contacts.json')) as f:
    CONTACTS = json.load(f)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Load data into CM app")
    parser.add_argument('host', nargs='?', default='localhost', help="Hostname of target")
    parser.add_argument('port', nargs='?', type=int, default=8080, help="Port of target")
    args = parser.parse_args()
    for contact in CONTACTS:
        print contact
        data = json.dumps(contact)
        print 'data', data
        r = requests.post(
            'http://{host}:{port}/contacts'.format(
                host=args.host, port=args.port
            ),
            data=data,
            headers={
                'content-type': 'application/json'
            }
        )
        print r.status_code, r.reason
