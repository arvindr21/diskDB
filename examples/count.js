// once you run npm install diskDB,
// var db = require('diskdb'); instead of
var db = require('../lib/diskdb.js');

db.connect('db', ['articles']);
var article = {
    title : 'diskDB rocks',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
console.log(db.articles.count()); // will be 1

// run : node count.js