'use strict';
// once you run npm install diskDB,
// var db = require('diskdb'); instead of
var DiskDB = require('..').default;
var db = new DiskDB();

db.connect(`${__dirname}/db`, ['articles']);
var articleComments = {
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

var savedArticle = db.articles.save([articleComments, articleComments2, articleCommentsL3]);
var foundArticles = db.articles.find();
var foundArticles = db.articles.find({rating : 1});

console.log(foundArticles);

// run : node nestedFindAll.js
