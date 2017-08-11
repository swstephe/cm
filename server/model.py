# -*- coding: utf8 -*-
import bson
import pymongo

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client.contacts


def encoder(obj):
    if isinstance(obj, pymongo.cursor.Cursor):
        return [encoder(elem) for elem in obj]
    if isinstance(obj, dict):
        return dict((k, encoder(v)) for k, v in obj.iteritems())
    if isinstance(obj, bson.objectid.ObjectId):
        return str(obj)
    return obj


def get_contacts():
    return encoder(db.contacts.find())
