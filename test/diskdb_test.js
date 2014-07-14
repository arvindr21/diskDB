'use strict';

var diskdb = require('../lib/diskdb.js');
var fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var dbPath = 'test/testdb',
    collection = ['articles'],
    collections = ['comments', 'rating'],
    article = {
        title: 'diskDB rocks',
        published: 'today'
    },
    article2 = {
        title: 'diskDB rocks',
        published: 'yesterday'
    },
    //nested objects
    articleComments = {
        title: 'diskDB rocks',
        published: '2 days ago',
        comments: [{
            name: 'a user',
            comment: 'this is cool',
            rating: 2
        }, {
            name: 'b user',
            comment: 'this is ratchet',
            rating: 3
        }, {
            name: 'c user',
            comment: 'this is awesome',
            rating: 2
        }]
    },
    articleComments2 = {
        title: 'diskDB rocks again',
        published: '3 days ago',
        comments: [{
            name: 'a user',
            comment: 'this is cool',
            rating: 1
        }, {
            name: 'b user',
            comment: 'this is ratchet',
            rating: 1
        }, {
            name: 'c user',
            comment: 'this is awesome',
            rating: 2
        }]
    },
    articleCommentsL3 = {
        title: 'diskDB rocks again',
        published: '3 days ago',
        comments: [{
            name: 'a user',
            comment: 'this is cool',
            rating: 2,
            comments: [{
                name: 'd user',
                comment: 'A reply',
                rating: 1
            }]
        }, {
            name: 'b user',
            comment: 'this is ratchet',
            rating: 2
        }, {
            name: 'c user',
            comment: 'this is awesome',
            rating: 2
        }]
    };

exports.connectNload = {
    setUp: function(done) {
        deleteFolderRecursive(dbPath);

        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        done();
    },
    'connect : ': function(test) {
        test.expect(1);
        test.equal(typeof(diskdb.connect(dbPath, collection)[collection[0]]), 'object', 'Successfully Connected and collection instantiated');
        test.done();
    },
    'loadCollections : ': function(test) {
        test.expect(3);
        // connect to DB
        diskdb.connect(dbPath);
        // load single collecion
        test.equal(diskdb.loadCollections(collection)[collection[0]].collectionName, collection[0], 'Loading single collection');
        //load multiple collections
        test.equal(diskdb.loadCollections(collections)[collections[0]].collectionName, collections[0], 'Loading multiple collection');
        test.equal(diskdb.loadCollections(collections)[collections[1]].collectionName, collections[1], 'Loading multiple collection');
        test.done();
    },
    tearDown: function(callback) {
        // remove collections
        diskdb.loadCollections(collections);
        diskdb[collections[0]].remove();
        diskdb[collections[1]].remove();
        callback();
    },
};

exports.count = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init diskdb
        diskdb.connect(dbPath, collection);
        // remove articles collection
        diskdb.articles.remove();
        //reinit the collection
        diskdb.loadCollections(collection);

        done();
    },
    'count : ': function(test) {
        test.expect(2);
        test.equal(diskdb.articles.count(), 0, 'Count should be 0');
        diskdb.articles.save(article);
        diskdb.articles.save(article2);
        test.equal(diskdb.articles.count(), 2, 'Count should be 2');
        test.done();
    },
};

exports.saveData = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init diskdb
        diskdb.connect(dbPath, collection);
        // remove articles collection
        diskdb.articles.remove();
        //reinit the collection
        diskdb.loadCollections(collection);

        done();
    },
    'save : ': function(test) {
        test.expect(2);
        test.equal(diskdb.articles.count(), 0, 'No records before save');
        test.equal(diskdb.articles.save(article).title, article.title, 'One record should get saved');
        test.done();
    },

    'save multiple: ': function(test) {
        test.expect(3);
        test.equal(diskdb.articles.count(), 0, 'No records before save');
        test.equal(diskdb.articles.save([article]).length, 1, 'One record should get saved');
        test.equal(diskdb.articles.save([article, article2]).length, 2, 'Two records should get saved');
        test.done();
    },
};

exports.findAll = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init diskdb
        diskdb.connect(dbPath, collection);
        // remove articles collection
        diskdb.articles.remove();
        //reinit the collection
        diskdb.loadCollections(collection);
        done();
    },

    'findAll : ': function(test) {
        test.expect(3);
        //save two record
        diskdb.articles.save(article);
        diskdb.articles.save(article2);

        test.equal(diskdb.articles.find().length, 2, 'Should find two records');
        // find with a query
        test.equal(diskdb.articles.find({
            title: 'diskDB rocks'
        }).length, 2, 'Should find two records with query');
        // no record should be returned when the query does not match any records
        test.equal(diskdb.articles.find({
            title: 'dummy text'
        }).length, 0, 'Should find no records');

        test.done();
    },

    'findAllNested : ': function(test) {
        test.expect(6);
        //save two records
        diskdb.articles.save(articleComments);
        diskdb.articles.save(articleComments2);

        // no query
        test.equal(diskdb.articles.find().length, 2, 'Should find two records');

        // find with a query
        test.equal(diskdb.articles.find({
            rating: 2
        }).length, 2, 'Should find two records with query');

        // find with a query
        test.equal(diskdb.articles.find({
            rating: 1
        }).length, 1, 'Should find one records with query');

        // no record should be returned when the query does not match any records
        test.equal(diskdb.articles.find({
            name: 'dummy text'
        }).length, 0, 'Should find no records');

        // check 3 level deep 
        diskdb.articles.save(articleCommentsL3);
        // no query
        test.equal(diskdb.articles.find().length, 3, 'Should find three records');

        test.equal(diskdb.articles.find({
            rating: 1
        }).length, 2, 'Should find two records with query');

        test.done();
    },
};

exports.findOne = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init diskdb
        diskdb.connect(dbPath, collection);
        // remove articles collection
        diskdb.articles.remove();
        //reinit the collection
        diskdb.loadCollections(collection);
        done();
    },

    'findOne : ': function(test) {
        var query = 'diskDB rocks';
        test.expect(3);
        //save two record
        diskdb.articles.save(article);
        diskdb.articles.save(article2);

        test.equal(diskdb.articles.findOne().published, 'today', 'Should return the first record');
        // find with a query
        test.equal(diskdb.articles.findOne({
            title: query
        }).title, query, 'Should find One record on query');
        // no record should be returned when the query does not match any records
        test.equal(diskdb.articles.find({
            title: 'dummy text'
        }).title, undefined, 'No records should be found');

        test.done();
    },

    'findOneNested : ': function(test) {
        test.expect(3);
        //save two record
        diskdb.articles.save(article);
        diskdb.articles.save(article2);
        diskdb.articles.save(articleComments);
        diskdb.articles.save(articleComments2);
        diskdb.articles.save(articleCommentsL3);

        test.equal(diskdb.articles.findOne().published, 'today', 'Should return the first record');
        
        // find with a query
        test.equal(diskdb.articles.findOne({
            rating: 1
        }).title, 'diskDB rocks again', 'Should find One record on query get the title of the object');

        // no record should be returned when the query does not match any records
        test.equal(diskdb.articles.find({
            rating: 0
        }).title, undefined, 'No records should be found');

        test.done();
    },
};

exports.update = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init diskdb
        diskdb.connect(dbPath, collection);
        // remove articles collection
        diskdb.articles.remove();
        //reinit the collection
        diskdb.loadCollections(collection);
        done();
    },

    'update : ': function(test) {
        var query = {
            'published': 'today'
        };
        var options = {
            'multi': false,
            'upsert': false
        };

        test.expect(4);
        //save one record
        diskdb.articles.save(article);
        // before update
        test.equal(diskdb.articles.findOne().published, article.published, 'Should return the same record as inserted');
        // after update
        test.equal(diskdb.articles.update(query, article2, options).updated, 1, 'Should return the updated objects count');

        //change options
        query = {
            'dummy': 'not found'
        };
        options = {
            'multi': false,
            'upsert': true
        };
        // should insert
        test.equal(diskdb.articles.update(query, article2, options).inserted, 1, 'Should return the inserted objects count');

        //change options
        query = {
            published: 'yesterday'
        };

        options = {
            'multi': true,
            'upsert': true
        };

        // should update 2 record
        test.equal(diskdb.articles.update(query, article, options).updated, 2, 'Should return the updated objects count');
        test.done();
    },
};

exports.remove = {
    setUp: function(done) {
        // create the directory
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        // init diskdb
        diskdb.connect(dbPath, collection);
        // remove articles collection
        diskdb.articles.remove();
        //reinit the collection
        diskdb.loadCollections(collection);
        done();
    },

    'remove : ': function(test) {
        test.expect(9);
        //save two record
        diskdb.articles.save(article);
        diskdb.articles.save(article);
        diskdb.articles.save(article2);


        //before deletion
        test.equal(diskdb.articles.count(), 3, 'There should be 3 records in the collection');
        //deletion -- default true
        test.equal(diskdb.articles.remove({
            'published': 'today'
        }), true, 'Deletion should be successful');
        //after deletion
        test.equal(diskdb.articles.count(), 1, 'There should be 1 record in the collection');

        //repopulate data
        diskdb.articles.save(article);
        diskdb.articles.save(article);

        //deletion -- default true
        test.equal(diskdb.articles.remove({
            'published': 'today'
        }, true), true, 'Deletion should be successful');
        //after deletion
        test.equal(diskdb.articles.count(), 1, 'There should be 1 record in the collection');

        //repopulate data
        diskdb.articles.save(article);
        diskdb.articles.save(article);

        //deletion -- default true
        test.equal(diskdb.articles.remove({
            'published': 'today'
        }, false), true, 'Deletion should be successful');
        //after deletion
        test.equal(diskdb.articles.count(), 2, 'There should be 2 records in the collection');

        //remove the collection completely
        test.equal(diskdb.articles.remove(), true, 'Deletion should be successful');
        //the collection should not exist any more
        test.equal(diskdb.articles, undefined, 'collection should be removed');
        test.done();
    },
};

var deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
