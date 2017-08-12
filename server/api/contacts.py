# -*- coding: utf8 -*-
import logger
from bottle import Bottle, request, response
from plugins.mongo import MongoPlugin
from bson.objectid import ObjectId
from mongo_dict import Visitor
from config import URI

log = logger.getLogger(__name__)
api = Bottle()
visitor = Visitor()


@api.get('/')
def get_handler(mongodb):
    return dict(
        message='Success',
        contacts=visitor.visit(mongodb.contacts.find())
    )


@api.post('/')
def post_handler(mongodb):
    data = request.json
    result = mongodb.contacts.insert_one({
        'first': data['first'],
        'last': data['last'],
        'email': data['email'],
        'phone': data['phone']
    })
    return dict(
        message='Saved contact',
        obj=visitor.visit(result)
    )


@api.get('/:_id')
def get_id_handler(mongodb, _id):
    return visitor.visit(mongodb.contacts.find_one({'_id': ObjectId(_id)}))


@api.route('/:_id', method='PATCH')
def patch_handler(mongodb, _id):
    data = request.json
    doc = mongodb.contacts.find_one({'_id': ObjectId(_id)})
    doc.update(data)
    result = mongodb.contacts.replace_one({'_id': ObjectId(_id)}, doc)
    return dict(
        message='Updated contact',
        obj=visitor.visit(doc),
        result=visitor.visit(result)
    )


@api.delete('/:_id')
def delete_handler(mongodb, _id):
    result = mongodb.contacts.delete_one({'_id': ObjectId(_id)})
    return dict(
        message='Deleted contact',
        result=visitor.visit(result),
    )


plugin = MongoPlugin(URI, 'contacts', json_mongo=False)
api.install(plugin)