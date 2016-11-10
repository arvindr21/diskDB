'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * diskDB
 * http://arvindr21.github.io/diskDB
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

var util = require('./util'),
    path = require('path'),
    uuid = require('node-uuid');

module.exports = function (db, collectionName, opts) {

    opts = opts || {};

    // throw an exception if the collection's JSON file is invalid?
    opts.throwParseError = opts.throwParseError === undefined ? false : opts.throwParseError;

    var coltn = {};
    coltn.collectionName = collectionName;
    coltn._f = path.join(db._db.path, collectionName + '.json');

    coltn._parse = function () {
        try {
            return JSON.parse(String(util.readFromFile(this._f)));
        } catch (err) {
            if (opts.throwParseError) {
                throw err;
            }
        }
        return [];
    };

    coltn.find = function (query) {
        var collection = this._parse();
        if (!query || Object.keys(query).length === 0) {
            return collection;
        } else {
            var searcher = new util.ObjectSearcher();
            return searcher.findAllInObject(collection, query, true);
        }
    };

    coltn.findOne = function (query) {
        var collection = this._parse();
        if (!query) {
            return collection[0];
        } else {
            var searcher = new util.ObjectSearcher();
            return searcher.findAllInObject(collection, query, false)[0];
        }
    };

    coltn.save = function (data) {
        var collection = this._parse();
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data.length) {
            if (data.length === 1) {
                if (data[0].length > 0) {
                    data = data[0];
                }
            }
            var retCollection = [];
            for (var i = data.length - 1; i >= 0; i--) {
                var d = data[i];
                d._id = uuid.v4().replace(/-/g, '');
                collection.push(d);
                retCollection.push(d);
            }
            util.writeToFile(this._f, collection);
            return retCollection;
        }{
            data._id = uuid.v4().replace(/-/g, '');
            collection.push(data);
            util.writeToFile(this._f, collection);
            return data;
        }
    };

    coltn.update = function (query, data, options) {
        var ret = {},
            collection = this._parse(); // update
        var records = util.finder(collection, query, true);
        if (records.length) {
            if (options && options.multi) {
                collection = util.updateFiltered(collection, query, data, true);
                ret.updated = records.length;
                ret.inserted = 0;
            } else {
                collection = util.updateFiltered(collection, query, data, false);
                ret.updated = 1;
                ret.inserted = 0;
            }
        } else {
            if (options && options.upsert) {
                data._id = uuid.v4().replace(/-/g, '');
                collection.push(data);
                ret.updated = 0;
                ret.inserted = 1;
            } else {
                ret.updated = 0;
                ret.inserted = 0;
            }
        }
        util.writeToFile(this._f, collection);
        return ret;
    };

    coltn.remove = function (query, multi) {
        if (query) {
            var collection = this._parse();
            if (typeof multi === 'undefined') {
                multi = true;
            }
            collection = util.removeFiltered(collection, query, multi);

            util.writeToFile(this._f, collection);
        } else {
            util.removeFile(this._f);
            delete db[collectionName];
        }
        return true;
    };

    coltn.count = function () {
        return this._parse().length;
    };

    return coltn;
};