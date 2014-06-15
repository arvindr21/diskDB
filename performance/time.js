// Check the processing time for each of the DB operations with load 
var db = require('../lib/diskdb.js');
var fs = require('fs');
db.connect('db', ['articles']);
// remove the articles JSON if exists
db.articles.remove();
// reload collection
db.loadCollections(['articles']);

/****************** Test for One article *************/
var article = {
    title: 'diskDB rocks',
    published: 'today',
    rating: '5 stars'
}
console.log('\n\n/****************** Test for One article *************/');

console.time('Single Insert');
var resp = db.articles.save(article);
//console.log('save : ' , resp);
console.timeEnd('Single Insert');

console.time('Single Find without query');
var resp = db.articles.find();
//console.log('find : ' , resp);
console.timeEnd('Single Find without query');

console.time('Single Find with query');
var resp = db.articles.find(article);
//console.log('find : ' , resp);
console.timeEnd('Single Find with query');

console.time('Single Find One without query');
var resp = db.articles.findOne();
//console.log('find : ' , resp);
console.timeEnd('Single Find One without query');

console.time('Single Find One with query');
var resp = db.articles.findOne(article);
//console.log('find : ' , resp);
console.timeEnd('Single Find One with query');

console.time('Single Update');
var resp = db.articles.update({
    title: 'diskDB rocks'
}, {
    title: 'diskDB is awesome'
});
//console.log('update : ' , resp);
console.timeEnd('Single Update');

console.time('Get Count');
var resp = db.articles.count();
//console.log('count : ' , resp);
console.timeEnd('Get Count');

console.log("File size before deletion : ",getFilesizeInBytes(db.articles._f));

console.time('Single remove with query');
var resp = db.articles.remove(article);
//console.log('remove : ' , resp);
console.timeEnd('Single remove with query');

console.time('Remove collection');
var resp = db.articles.remove();
//console.log('remove : ' , resp);
console.timeEnd('Remove collection');

console.log('/****************** Test for One article *************/\n\n');
/****************** Test for One article *************/

/****************** Test for 1000 articles *************/
var articles = [];
for (var i = 0; i < 1000; i++) {
    articles.push({
        title: 'diskDB rocks ' + i,
        published: 'today ' + i,
        rating: '5 stars ' + i
    });
};
// reload collection
db.loadCollections(['articles']);

console.log('/****************** Test for 1000 articles *************/');

console.time('1000 Insert');
var resp = db.articles.save([articles]);
//console.log('save : ' , resp);
console.timeEnd('1000 Insert');

console.time('1000 Find without query');
var resp = db.articles.find();
//console.log('find : ' , resp);
console.timeEnd('1000 Find without query');

console.time('1000 Find with query');
var resp = db.articles.find(articles[0]);
//console.log('find : ' , resp);
console.timeEnd('1000 Find with query');

console.time('1000 Find One without query');
var resp = db.articles.findOne();
//console.log('find : ' , resp);
console.timeEnd('1000 Find One without query');

console.time('1000 Find One with query');
var resp = db.articles.findOne(articles[0]);
//console.log('find : ' , resp);
console.timeEnd('1000 Find One with query');

console.time('1000 Update');
var resp = db.articles.update({
    title: 'diskDB rocks'
}, {
    title: 'diskDB is awesome'
});
//console.log('update : ' , resp);
console.timeEnd('1000 Update');

console.time('1000 Count');
var resp = db.articles.count();
//console.log('count : ' , resp);
console.timeEnd('1000 Count');

console.log("File size before deletion : ",getFilesizeInBytes(db.articles._f));

console.time('1000 remove with query');
var resp = db.articles.remove(articles[0]);
//console.log('remove : ' , resp);
console.timeEnd('1000 remove with query');

console.time('remove collection');
var resp = db.articles.remove();
//console.log('remove : ' , resp);
console.timeEnd('remove collection');

console.log('/****************** Test for 1000 articles *************/\n\n');

/****************** Test for 1000 articles *************/

/****************** Test for 10000 articles *************/
var articles = [];
for (var i = 0; i < 10000; i++) {
    articles.push({
        title: 'diskDB rocks ' + i,
        published: 'today ' + i,
        rating: '5 stars ' + i
    });
};
// reload collection
db.loadCollections(['articles']);

console.log('/****************** Test for 10000 articles *************/');

console.time('10000 Insert');
var resp = db.articles.save([articles]);
//console.log('save : ' , resp);
console.timeEnd('10000 Insert');

console.time('10000 Find without query');
var resp = db.articles.find();
//console.log('find : ' , resp);
console.timeEnd('10000 Find without query');

console.time('10000 Find with query');
var resp = db.articles.find(articles[0]);
//console.log('find : ' , resp);
console.timeEnd('10000 Find with query');

console.time('10000 Find One without query');
var resp = db.articles.findOne();
//console.log('find : ' , resp);
console.timeEnd('10000 Find One without query');

console.time('10000 Find One with query');
var resp = db.articles.findOne(articles[0]);
//console.log('find : ' , resp);
console.timeEnd('10000 Find One with query');

console.time('10000 Update');
var resp = db.articles.update({
    title: 'diskDB rocks'
}, {
    title: 'diskDB is awesome'
});
//console.log('update : ' , resp);
console.timeEnd('10000 Update');

console.time('10000 Count');
var resp = db.articles.count();
//console.log('count : ' , resp);
console.timeEnd('10000 Count');

console.log("File size before deletion : ",getFilesizeInBytes(db.articles._f));

console.time('10000 remove with query');
var resp = db.articles.remove(articles[0]);
//console.log('remove : ' , resp);
console.timeEnd('10000 remove with query');

console.time('remove collection');
var resp = db.articles.remove();
//console.log('remove : ' , resp);
console.timeEnd('remove collection');

console.log('/****************** Test for 10000 articles *************/\n\n');

/****************** Test for 10000 articles *************/


/****************** Test for 100000 articles *************/
var articles = [];
for (var i = 0; i < 100000; i++) {
    articles.push({
        title: 'diskDB rocks ' + i,
        published: 'today ' + i,
        rating: '5 stars ' + i
    });
};
// reload collection
db.loadCollections(['articles']);

console.log('/****************** Test for 100000 articles *************/');

console.time('100000 Insert');
var resp = db.articles.save([articles]);
//console.log('save : ' , resp);
console.timeEnd('100000 Insert');

console.time('100000 Find without query');
var resp = db.articles.find();
//console.log('find : ' , resp);
console.timeEnd('100000 Find without query');

console.time('100000 Find with query');
var resp = db.articles.find(articles[0]);
//console.log('find : ' , resp);
console.timeEnd('100000 Find with query');

console.time('100000 Find One without query');
var resp = db.articles.findOne();
//console.log('find : ' , resp);
console.timeEnd('100000 Find One without query');

console.time('100000 Find One with query');
var resp = db.articles.findOne(articles[0]);
//console.log('find : ' , resp);
console.timeEnd('100000 Find One with query');

console.time('100000 Update');
var resp = db.articles.update({
    title: 'diskDB rocks'
}, {
    title: 'diskDB is awesome'
});
//console.log('update : ' , resp);
console.timeEnd('100000 Update');

console.time('100000 Count');
var resp = db.articles.count();
//console.log('count : ' , resp);
console.timeEnd('100000 Count');

console.log("File size before deletion : ",getFilesizeInBytes(db.articles._f));

console.time('100000 remove with query');
var resp = db.articles.remove(articles[0]);
//console.log('remove : ' , resp);
console.timeEnd('100000 remove with query');

console.time('remove collection');
var resp = db.articles.remove();
//console.log('remove : ' , resp);
console.timeEnd('remove collection');

console.log('/****************** Test for 100000 articles *************/\n\n');

/****************** Test for 100000 articles *************/


/****************** Test for 1000000 articles *************/
var articles = [];
for (var i = 0; i < 1000000; i++) {
    articles.push({
        title: 'diskDB rocks ' + i,
        published: 'today ' + i,
        rating: '5 stars ' + i
    });
};
// reload collection
db.loadCollections(['articles']);

console.log('/****************** Test for 1000000 articles *************/');

console.time('1000000 Insert');
var resp = db.articles.save([articles]);
//console.log('save : ' , resp);
console.timeEnd('1000000 Insert');

console.time('1000000 Find without query');
var resp = db.articles.find();
//console.log('find : ' , resp);
console.timeEnd('1000000 Find without query');

console.time('1000000 Find with query');
var resp = db.articles.find(articles[0]);
//console.log('find : ' , resp);
console.timeEnd('1000000 Find with query');

console.time('1000000 Find One without query');
var resp = db.articles.findOne();
//console.log('find : ' , resp);
console.timeEnd('1000000 Find One without query');

console.time('1000000 Find One with query');
var resp = db.articles.findOne(articles[0]);
//console.log('find : ' , resp);
console.timeEnd('1000000 Find One with query');

console.time('1000000 Update');
var resp = db.articles.update({
    title: 'diskDB rocks'
}, {
    title: 'diskDB is awesome'
});
//console.log('update : ' , resp);
console.timeEnd('1000000 Update');

console.time('1000000 Count');
var resp = db.articles.count();
//console.log('count : ' , resp);
console.timeEnd('1000000 Count');

console.log("File size before deletion : ",getFilesizeInBytes(db.articles._f));

console.time('1000000 remove with query');
var resp = db.articles.remove(articles[0]);
//console.log('remove : ' , resp);
console.timeEnd('1000000 remove with query');

console.time('remove collection');
var resp = db.articles.remove();
//console.log('remove : ' , resp);
console.timeEnd('remove collection');

console.log('/****************** Test for 1000000 articles *************/\n\n');

/****************** Test for 1000000 articles *************/

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats['size'] / 1000000.0;
    return fileSizeInBytes + ' MB'
}


// run node time.js
