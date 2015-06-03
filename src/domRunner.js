
/**
 * @fileoverview Implements DomRunner
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

var NODE = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3
};

/**
 * DomRunner
 * @exports DomRunner
 * @constructor
 * @class
 * @param {DOMElement} node root node that has nodes to interate(not iterate itself and any its siblings)
 */
function DomRunner(node) {
    this._root = node;
    this._current = node;
}

DomRunner.prototype.next = function() {
    var current = this._current,
        node;

    if (this._current) {
        node = this._getNextNode(current);

        while (this._isNeedNextSearch(node, current)) {
            current = current.parentNode;
            node = current.nextSibling;
        }

        this._current = node;
    }

    return this._current;
};

DomRunner.prototype.getNode = function() {
    return this._current;
};

DomRunner.prototype.getNodeText = function() {
    var node = this.getNode(),
        text;

    if (node.nodeType === NODE.TEXT_NODE) {
        text = node.nodeValue;
    } else {
        text = node.textContent || node.innerText;
    }

    return text;
};

DomRunner.prototype._isNeedNextSearch = function(node, current) {
    return !node && current !== this._root;
};

DomRunner.prototype._getNextNode = function(current) {
    return current.firstChild || current.nextSibling;
};

DomRunner.NODE_TYPE = NODE;

module.exports = DomRunner;
