/*
 * diskDB
 * http://arvindr21.github.io/diskDB
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

import { join } from 'path';
import { v4 } from 'node-uuid';

import * as util from './util';

const UUID = () => v4().replace(/-/g, '');

export default class Collection {

  constructor(db, collectionName, opts = {}) {

    this.db = db;
    this.opts = opts;

    // throw an exception if the collection's JSON file is invalid?
    this.opts.throwParseError = opts.throwParseError === undefined ? false : opts.throwParseError;

    this.collectionName = collectionName;
    this._f = join(db._db.path, `${collectionName}.json`);
  }

  _parse() {
    try {
      return JSON.parse(String(util.readFromFile(this._f)));
    } catch (err) {
      if (this.opts.throwParseError) {
        throw err;
      }
    }
    return [];
  }

  find(query) {
    var collection = this._parse();
    if (!query || Object.keys(query).length === 0) {
      return collection;
    }
    var searcher = new util.ObjectSearcher();
    return searcher.findAllInObject(collection, query, true);
  }

  findOne(query) {
    var collection = this._parse();
    if (!query) {
      return collection[0];
    }
    var searcher = new util.ObjectSearcher();
    return searcher.findAllInObject(collection, query, false)[0];
  }

  save(data) {
    var collection = this._parse();
    if (typeof data === 'object' && data.length) {
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

  update(query, data, options) {
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

  remove(query, multi) {
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

  count() {
    return this._parse().length;
  }

}
