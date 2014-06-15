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
    fs.writeFileSync(outputFilename, JSON.stringify(content, null, 4));
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

util.finder = function(collection, query, multi) {
    var retCollection = [];
    loop: for (var i = collection.length - 1; i >= 0; i--) {
        var c = collection[i];
        for (var p in query) {
            if (p in c && c[p] == query[p]) {
                retCollection = collection[i];
                if (!multi) {
                    break loop;
                }
            }
        }
    }
    return retCollection;
};

// needs cleanup
// have to use util.finder for findAll and update too
Array.prototype.finder = function(obj, multi) {
    var f = true;
    return this.filter(function(item) {
        loop: for (var prop in obj) {
            if (!(prop in item) || obj[prop] !== item[prop]) {
                if (!multi) {
                    break loop;
                }
                return false;
            }
        }
        return true;
    });
    loop: while (f) { // work around for jslint label assigments
        f = false;
        return true;
    }
};

module.exports = util;
