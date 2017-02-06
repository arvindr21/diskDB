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
//var foundArticles = db.articles.findOne();
var foundArticles = db.articles.findOne({rating : '5 stars'});

console.log(foundArticles);

// run : node findOne.js
