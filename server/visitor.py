# -*- coding: utf8 -*-
import logging

log = logging.getLogger(__name__)


class Visitor(object):
    def __init__(self, debug=False):
        self.debug = debug

    def visit(self, node):
        mro = node.mro() if isinstance(node, type) else type(node).mro()
        for cls in mro:
            meth_name = 'visit_{}'.format(cls.__name__)
            meth = getattr(self, meth_name, None)
            if meth is not None:
                value = meth(node)
                if self.debug:
                    log.debug("%s(%r)=%r", meth_name, node, value)
                return value
        if hasattr(self, 'visit_'):
            value = self.visit_(node)
            if self.debug:
                log.debug("visit_(%r)=%r", node, value)
            return value
        raise NotImplementedError("No visitation method: visit_{}".format(
            node.__class__.__name__
        ))
