/*
 * diskDB
 * http://arvindr21.github.io/diskDB
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

/*jshint -W027*/
var fs = require('fs');
var merge = require('merge');
var util = {};

util.isValidPath = function(path) {
    return fs.existsSync(path);
};

util.writeToFile = function(outputFilename, content) {
    if (!content) {
        content = [];
    }
    fs.writeFileSync(outputFilename, JSON.stringify(content, null, 0));
};

util.readFromFile = function(file) {
    return fs.readFileSync(file, 'utf-8');
};

util.removeFile = function(file) {
    return fs.unlinkSync(file);
};

util.updateFiltered = function(collection, query, data, multi) {
    // break 2 loops at once - multi : false
    loop: for (var i = collection.length - 1; i >= 0; i--) {
        var c = collection[i];
        for (var p in query) {
            if (p in c && c[p] == query[p]) {
                collection[i] = merge(c, data);
                if (!multi) {
                    break loop;
                }
            }
        }
    }
    return collection;
};

// [TODO] : Performance
util.removeFiltered = function(collection, query, multi) {
    // break 2 loops at once -  multi : false
    loop: for (var i = collection.length - 1; i >= 0; i--) {
        var c = collection[i];
        for (var p in query) {
            if (p in c && c[p] == query[p]) {
                collection.splice(i, 1);
                if (!multi) {
                    break loop;
                }
            }
        }
    }
    return collection;
};

// [TODO] : Performance
util.finder = function(collection, query, multi) {
    var retCollection = [];
    loop: for (var i = collection.length - 1; i >= 0; i--) {
        var c = collection[i];
        for (var p in query) {
            if (p in c && c[p] == query[p]) {
                retCollection.push(collection[i]);
                if (!multi) {
                    break loop;
                }
            }
        }
    }
    return retCollection;
};

module.exports = util;
