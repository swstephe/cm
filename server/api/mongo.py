# -*- coding: utf8 -*-
__all__ = ['MongoPlugin',]

from json import dumps
import inspect
from bottle import PluginError, response, JSONPlugin
import pymongo
import bson.json_util


class MongoPlugin(object):
    api = 2

    def __init__(self, uri, keyword='mongodb', json_mongo=False, post_create=None, **kwargs):
        if not uri:
            raise PluginError("MongoDB uri is required")

        self.uri = uri
        self.keyword = keyword
        self.json_mongo = json_mongo
        self.mongo_db = None
        self.name = 'mongo:' + keyword
        self.post_create = post_create

    def get_mongo(self):
        if self.mongo_db:
            return self.mongo_db

        self.mongo_db = pymongo.MongoClient(self.uri)
        return self.mongo_db

    def normalize_object(self, obj):
        """Normalize mongo object for json serialization."""
        if isinstance(obj, dict):
            if "_id" in obj:
                obj["id"] = str(obj["_id"])
                del obj["_id"]
        if isinstance(obj, list):
            for a in obj:
                self.normalize_object(a)

    def setup(self, app):
        """Called as soon as the plugin is installed to an application."""
        for other in app.plugins:
            if not isinstance(other, MongoPlugin):
                continue

    def apply(self, callback, context):
        """Return a decorated route callback."""
        args = inspect.getargspec(context.callback)[0]
        # Skip this callback if we don't need to do anything
        if self.keyword not in args:
            return callback

        def wrapper(*a, **ka):
            ka[self.keyword] = self.get_mongo()
            rv = callback(*a, **ka)
            if self.json_mongo:  # Override bottle JSON->String serializer
                if isinstance(rv, dict):
                    self.normalize_object(rv)
                    json_response = dumps(rv, default=bson.json_util.default)
                    response.content_type = 'application/json'
                    return json_response

            return rv

        return wrapper
