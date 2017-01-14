/*
 * diskDB
 * http://arvindr21.github.io/diskDB
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _uuid = require('uuid');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UUID = function UUID() {
  return (0, _uuid.v4)().replace(/-/g, '');
};

var Collection = function () {
  function Collection(db, collectionName) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Collection);

    this.db = db;
    this.opts = opts;

    // throw an exception if the collection's JSON file is invalid?
    this.opts.throwParseError = opts.throwParseError === undefined ? false : opts.throwParseError;

    this.collectionName = collectionName;
    this._f = (0, _path.join)(db._db.path, collectionName + '.json');
  }

  _createClass(Collection, [{
    key: '_parse',
    value: function _parse() {
      try {
        return JSON.parse(String(util.readFromFile(this._f)));
      } catch (err) {
        if (this.opts.throwParseError) {
          throw err;
        }
      }
      return [];
    }
  }, {
    key: 'find',
    value: function find(query) {
      var collection = this._parse();
      if (!query || Object.keys(query).length === 0) {
        return collection;
      }
      var searcher = new util.ObjectSearcher();
      return searcher.findAllInObject(collection, query, true);
    }
  }, {
    key: 'findOne',
    value: function findOne(query) {
      var collection = this._parse();
      if (!query) {
        return collection[0];
      }
      var searcher = new util.ObjectSearcher();
      return searcher.findAllInObject(collection, query, false)[0];
    }
  }, {
    key: 'save',
    value: function save(data) {
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
          d._id = UUID().replace(/-/g, '');
          collection.push(d);
          retCollection.push(d);
        }
        util.writeToFile(this._f, collection);
        return retCollection;
      } else {
        data._id = UUID().replace(/-/g, '');
        collection.push(data);
        util.writeToFile(this._f, collection);
        return data;
      }
    }
  }, {
    key: 'update',
    value: function update(query, data, options) {
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
          data._id = UUID().replace(/-/g, '');
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
    }
  }, {
    key: 'remove',
    value: function remove(query, multi) {
      if (query) {
        var collection = this._parse();
        if (typeof multi === 'undefined') {
          multi = true;
        }
        collection = util.removeFiltered(collection, query, multi);
        util.writeToFile(this._f, collection);
      } else {
        util.removeFile(this._f);
        delete this.db[this.collectionName];
      }
      return true;
    }
  }, {
    key: 'count',
    value: function count() {
      return this._parse().length;
    }
  }]);

  return Collection;
}();

exports.default = Collection;