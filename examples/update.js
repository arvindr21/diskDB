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
console.log(updated); // { updated: 1, inserted: 0 }

// run : node update.js