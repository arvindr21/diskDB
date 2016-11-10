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
//save
var savedArticle = db.articles.save(article);
console.log(savedArticle);

//findAll
var foundArticles = db.articles.find();
console.log(foundArticles);

foundArticles = db.articles.find({rating : '5 stars'});
console.log(foundArticles);

//findOne
var foundArticles = db.articles.findOne();
console.log(foundArticles);

foundArticles = db.articles.findOne({rating : '5 stars'});
console.log(foundArticles);

//update
var query = {
	title : 'diskDB rocks'
};

var dataToBeUpdate = {
	title : 'diskDB rocks again!',
};

var options = {
	 multi: false,
	 upsert: false
};

var updated = db.articles.update(query, dataToBeUpdate, options);
console.log(updated);

// after update
foundArticles = db.articles.findOne({rating : '5 stars'});
console.log(foundArticles);

//count
console.log(db.articles.count());

//remove
db.articles.remove({rating : '5 stars'});
db.articles.remove();

// db.articles does not exist anymore!

// run : node all.js
