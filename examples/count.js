'use strict';
// once you run npm install diskDB,
// var db = require('diskdb'); instead of
var DiskDB = require('..').default;
var db = new DiskDB();

db.connect(`${__dirname}/db`, ['articles']);
var article = {
    title : 'diskDB rocks',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
console.log(db.articles.count()); // will be 1

// run : node count.js
