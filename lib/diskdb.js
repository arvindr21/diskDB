/*
 * diskDB
 * http://arvindr21.github.io/diskDB
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';
//global modules
var path = require('path'),
    c = require('chalk'),
    e = c.red,
    s = c.green;

//local modules
var util = require('./util');


var db = {
    connect: function(path, collections) {
        if (util.isValidPath(path)) {
            var _db = {};
            _db.path = path;
            this._db = _db;
            console.log(s('Successfully connected to : ' + path));
            if (collections) {
                this.loadCollections(collections);
            }
        } else {
            console.log(e('The DB Path [' + path + '] does not seem to be valid. Recheck the path and try again'));
            return false;
        }
        return this;
    },
    loadCollections: function(collections) {
        if (!this._db) {
            console.log(e('Initialize the DB before you add collections. Use : ', 'db.connect(\'path-to-db\');'));
            return false;
        }
        if (typeof collections === 'object' && collections.length) {
            for (var i = 0; i < collections.length; i++) {
                var p = path.join(this._db.path, (collections[i].indexOf('.json') >= 0 ? collections[i] : collections[i] + '.json'));
                if (!util.isValidPath(p)) {
                    util.writeToFile(p);
                }
                var _c = collections[i].replace('.json', '');
                this[_c] = new require('./collection')(this, _c);
            }
        } else {
            console.log(e('Invalid Collections Array.', 'Expected Format : ', '[\'collection1\',\'collection2\',\'collection3\']'));
        }
        return this;
    }

};

module.exports = db;
