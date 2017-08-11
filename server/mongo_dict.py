# -*- coding: utf8 -*-
import visitor


class Visitor(visitor.Visitor):
    @staticmethod
    def visit_(node):
        return node

    def visit_dict(self, node):
        return dict((k, self.visit(v)) for k, v in node.iteritems())

    def visit_Cursor(self, node):
        return list(self.visit(n) for n in node)

    def visit_DeleteResult(self, node):
        return dict(
            acknowledged=node.acknowledged,
            deleted_count=node.deleted_count
        )

    def visit_InsertOneResult(self, node):
        return dict(
            acknowledged=node.acknowledged,
            inserted_id=self.visit(node.inserted_id)
        )

    def visit_UpdateResult(self, node):
        return dict(
            acknowledged=node.acknowledged,
            matched_count=node.matched_count,
            modified_count=node.modified_count,
            upserted_id=self.visit(node.upserted_id)
        )

    @staticmethod
    def visit_ObjectId(node):
        return str(node)
