// Check the processing time for each of the DB operations with load 
var db = require('../lib/diskdb.js');
var fs = require('fs');
db.connect('db', ['articles']);
// remove the articles JSON if exists
db.articles.remove();
// reload collection
db.loadCollections(['articles']);

var x = 999;
var articles = [];
for (var i = 0; i < x; i++) {
    articles.push({
        title: 'diskDB rocks ' + i,
        published: 'today ' + i,
        rating: '5 stars ' + i
    });
};
// reload collection
db.loadCollections(['articles']);

console.log('/****************** Test for '+x+' article(s) *************/');

console.time(x+' : Insert(s)');
var resp = db.articles.save([articles]);
//console.log('save : ' , resp);
console.timeEnd(x+' : Insert(s)');

console.time(x+' : Find without query');
var resp = db.articles.find();
//console.log('find : ' , resp);
console.timeEnd(x+' : Find without query');

console.time(x+' : Find with query');
var resp = db.articles.find(articles[0]);
//console.log('find : ' , resp);
console.timeEnd(x+' : Find with query');

console.time(x+' : Find One without query');
var resp = db.articles.findOne();
//console.log('find : ' , resp);
console.timeEnd(x+' : Find One without query');

console.time(x+' : Find One with query');
var resp = db.articles.findOne(articles[0]);
//console.log('find : ' , resp);
console.timeEnd(x+' : Find One with query');

console.time(x+' : Update');
var resp = db.articles.update({
    title: 'diskDB rocks'
}, {
    title: 'diskDB is awesome'
});
//console.log('update : ' , resp);
console.timeEnd(x+' : Update');

console.time(x+' : Count');
var resp = db.articles.count();
//console.log('count : ' , resp);
console.timeEnd(x+' : Count');

console.log("File size before deletion : ",getFilesizeInBytes(db.articles._f));

console.time(x+' : remove with query');
var resp = db.articles.remove(articles[0]);
//console.log('remove : ' , resp);
console.timeEnd(x+' : remove with query');

console.time(x+' : remove collection');
var resp = db.articles.remove();
//console.log('remove : ' , resp);
console.timeEnd(x+' : remove collection');

console.log('/****************** Test for '+x+' article(s) *************/\n\n');

// utils
function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats['size'] / 1000000.0;
    return fileSizeInBytes + ' MB'
}


// run node time.js
