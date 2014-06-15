var util = require('./util');
var path = require('path');
var uuid = require('node-uuid');

module.exports = function(db, collectionName) {
    var coltn = {};
    coltn.collectionName = collectionName;
    coltn._f = path.join(db._db.path, (collectionName + '.json'));

    coltn.find = function(query) {
        var collection = JSON.parse(util.readFromFile(this._f));
        return collection.finder(query, true);
    };

    coltn.findOne = function(query) {
        var collection = JSON.parse(util.readFromFile(this._f));
        if (!query) {
            return collection[0];
        } else {
            return util.finder(collection, query, false);
        }
    };

    coltn.save = function(data) {
        var collection = JSON.parse(util.readFromFile(this._f));
        if (typeof data && data.length) {
            var retCollection = [];
            for (var i = data.length - 1; i >= 0; i--) {
                var d = data[i];
                d._id = uuid.v4().replace(/-/g, '');
                collection.push(d);
                retCollection.push(d);
            }
            util.writeToFile(this._f, collection);
            return retCollection;
        } {
            data._id = uuid.v4().replace(/-/g, '');
            collection.push(data);
            util.writeToFile(this._f, collection);
            return data;
        }
    };

    coltn.update = function(query, data, options) {
        var ret = {},
            collection = JSON.parse(util.readFromFile('./' + path.join(db._db.path, (collectionName + '.json'))));
        var records = collection.finder(query, true);
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

    coltn.remove = function(query, multi) {
        if (query) {
            var collection = JSON.parse(util.readFromFile(this._f));
            multi = (typeof multi == 'boolean') ? (multi === true ? true : false) : true;
            if (multi) {
                collection = util.removeFiltered(collection, query, true);
            } else {
                collection = util.removeFiltered(collection, query, false);
            }
            util.writeToFile(this._f, collection);
        } else {
            util.removeFile(this._f);
            delete db[collectionName];
        }
        return true;
    };

    coltn.count = function() {
        return (JSON.parse(util.readFromFile(this._f))).length;
    };

    return coltn;
};
