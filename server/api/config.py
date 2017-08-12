# -*- codin: utf8 -*-
import os
import yaml


CWD = os.path.dirname(os.path.realpath(__file__))


with open(os.path.join(CWD, 'config.yml')) as f:
    cfg = yaml.load(f)

URI = 'mongodb://'
if 'username' in cfg:
    URI += '{username}:{password}@'.format(**cfg)
URI += ','.join(cfg['nodelist']) + '/'
if 'database' in cfg:
    URI += cfg['database']
if 'options' in cfg:
    URI += '&'.join('{}={}'.format(k, v) for k, v in cfg['options'])

print URI