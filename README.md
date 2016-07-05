# diskDB [![Build Status](https://secure.travis-ci.org/arvindr21/diskDB.png?branch=master)](https://travis-ci.org/arvindr21/diskDB) [![NPM version](https://badge-me.herokuapp.com/api/npm/diskdb.png)](http://badges.enytc.com/for/npm/diskdb) [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/arvindr21/diskDB?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM](https://nodei.co/npm/diskdb.png?downloads=true&stars=true)](https://nodei.co/npm/diskdb/)

A Lightweight Disk based JSON Database with a MongoDB like API for Node.

_You will never know that you are interacting with a File System_

## Contents

* [Getting Started](#getting-started)
* [Documentation](#documentation)
  * [Connect](#connect-to-db)
  * [Load Collections](#load-collections)
  * [Write/Save](#writesave-to-collection)
  * [Read](#read-from-collection)
  * [Update](#update-collection)
  * [Remove](#remove-collection)
  * [Count](#count)
* [Examples](#examples)
* [Performance](#performance)
* [Contributing](#contributing)
* [Release History](#release-history)

## Getting Started
Install the module locally :  
```bash
$ npm install diskdb
```

```js
var db = require('diskdb');
db = db.connect('/path/to/db-folder', ['collection-name']);
// you can access the traditional JSON DB methods here
```

## Documentation
### Connect to DB
```js
db.connect(pathToFolder, ['filename']);
```
Filename will be the name of the JSON file. You can omit the extension, diskDB will take care of it for you.

```js
var db = require('diskdb');
db = db.connect('/examples/db', ['articles']);
// or simply
db.connect('/examples/db', ['articles']);
```

This will check for a directory at given path, if it does not exits, diskDB will throw an error and exit.

If the directory exists but the file/collection does not exist, diskDB will create it for you.

**Note** : If you have manually created an empty JSON file, please make sure that it contains at least an empty array.

```js
[]
```
Else it will throw an error like

```bash
undefined:0

^
SyntaxError: Unexpected end of input
```
---
### Load Collections
Alternatively you can also load collections like

```js
var db = require('diskdb');
// this
db = db.connect('/examples/db');
db.loadCollections(['articles']);
//or
db.connect('/examples/db');
db.loadCollections(['articles']);
//or
db.connect('/examples/db')
  .loadCollections(['articles']);
//or
db.connect('/examples/db', ['articles']);
```
#### Load Multiple Collections

```js
var db = require('diskdb');
db.connect('/examples/db', ['articles','comments','users']);
```
---
### Write/Save to Collection
```js
db.collectionName.save(object);
```
Once you have loaded a collection, you can access the collection's methods using the dot notation like

```js
db.[collectionName].[methodname]
```
To save the data, you can use
```js
var db = require('diskdb');
db.connect('db', ['articles']);
var article = {
    title : "diskDB rocks",
    published : "today",
    rating : "5 stars"
}
db.articles.save(article);
// or
db.articles.save([article]);
```
The saved data will be
```js
[
    {
        "title": "diskDB rocks",
        "published": "today",
        "rating": "5 stars",
        "_id": "0f6047c6c69149f0be0c8f5943be91be"
    }
]
```
You can also save multiple objects at once like

```js
var db = require('diskdb');
db.connect('db', ['articles']);
var article1 = {
    title : 'diskDB rocks',
    published : 'today',
    rating : '5 stars'
}

var article2 = {
    title : 'diskDB rocks',
    published : 'yesterday',
    rating : '5 stars'
}

var article3 = {
    title : 'diskDB rocks',
    published : 'today',
    rating : '4 stars'
}
db.articles.save([article1, article2, article3]);
```
And this will return the inserted objects

```js
[ { title: 'diskDB rocks',
    published: 'today',
    rating: '4 stars',
    _id: 'b1cdbb3525b84e8c822fc78896d0ca7b' },
  { title: 'diskDB rocks',
    published: 'yesterday',
    rating: '5 stars',
    _id: '42997c62e1714e9f9d88bf3b87901f3b' },
  { title: 'diskDB rocks',
    published: 'today',
    rating: '5 stars',
    _id: '4ca1c1597ddc4020bc41b4418e7a568e' } ]
```
---
### Read from Collection
There are 2 methods available for reading the JSON collection
* db.collectionName.find(query)
* db.collectionName.findOne(query)


#### db.collectionName.find()
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.find();
```
This will return all the records
```js
[{
    title: 'diskDB rocks',
    published: 'today',
    rating: '5 stars',
    _id: '0f6047c6c69149f0be0c8f5943be91be'
}]
```
You can also query with a criteria like
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.find({rating : "5 stars"});
```
This will return all the articles which have a rating of 5.

Find can take multiple criteria
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.find({rating : "5 stars", published: "yesterday"});
```
This will return all the articles with a rating of 5, published yesterday.

Nested JSON :

```js
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
}
```
```js
var savedArticle = db.articles.save([articleComments);
foundArticles = db.articles.find({rating : 2});
```
Since diskDB is mostly for light weight data storage, avoid nested structures and huge datasets.

#### db.collectionName.findOne(query)
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.findOne();
```

If you do not pass a query, diskDB will return the first article in the collection. If you pass a query, it will return first article in the filtered data.

```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.findOne({_id: '0f6047c6c69149f0be0c8f5943be91be'});
```
---
### Update Collection
```js
db.collectionName.update(query, data, options);
```

You can also update one or many objects in the collection
```js
options = {
    multi: false, // update multiple - default false
    upsert: false // if object is not found, add it (update-insert) - default false
}
```
Usage
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);

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
```
---
### Remove Collection
```js
db.collectionName.remove(query, multi);
```
You can remove the entire collection (including the file) or you can remove the matched objects by passing in a query. When you pass a query, you can either delete all the matched objects or only the first one by passing `multi` as `false`. The default value of `multi` is `true`.

```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.remove({rating : "5 stars"});
```
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.remove({rating : "5 stars"}, true); // remove all matched. Default - multi = true
```

```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.remove({rating : "5 stars"}, false); // remove only the first match
```
Using remove without any params will delete the file and will remove the db instance.
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.remove();
```
After the above operation `db.articles` is `undefined`.

---
### Count
```js
db.collectionName.count();
```
Will return the count of objects in the Collection
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.count(); // will give the count
```

## Examples
Refer to the [examples](https://github.com/arvindr21/diskDB/tree/master/examples) folder.

## Performance
To validate diskDB's performance and to check if it meets your needs, you can clone this repo and run

```bash
$ node performance/time.js
```
An average of few tests (run on OS X - 10.9.3 | 2.9GHZ i7 | 8GB 1600MHz DDR3) can be found below

#### Time taken to process x number of objects (in ms) vs Action Performed

\# of objects          | 1          | 1000       | 10000      | 100000     | 1000000
-----------------------|------------|------------|------------|------------|-------------
Save                   | 1 ms       | 15 ms      | 137 ms     | 1728 ms    | 14425 ms   
Find all without query | 0 ms       | 2 ms       | 12 ms      | 204 ms     | 2923 ms    
Find all with query    | 0 ms       | 2 ms       | 17 ms      | 738 ms     | 1985 ms    
Find one without query | 0 ms       | 1 ms       | 9 ms       | 791 ms     | 1676 ms    
Find one with query    | 0 ms       | 1 ms       | 8 ms       | 219 ms     | 1410 ms    
Update all records     | 1 ms       | 7 ms       | 61 ms      | 206 ms     | 48035 ms   
Get count              | 0 ms       | 3 ms       | 11 ms      | 260 ms     | 2420 ms    
Remove with query      | 0 ms       | 7 ms       | 59 ms      | 984 ms     | 48191 ms   
Remove collection      | 0 ms       | 1 ms       | 4 ms       | 52 ms      | 154 ms     
File size              | 0.000111 MB| 0.116671 MB| 1.196671 MB| 12.26667 MB| 125.66667 MB


## Contributing
See the [CONTRIBUTING Guidelines](https://github.com/arvindr21/diskDB/blob/master/CONTRIBUTING.md)

## Release History
* 0.1.x
  * Base Module with
    * Connect to a Folder
    * Access a Collection/File
    * Create Read Update Delete on JSON object
    * Minor fixes and tests
    * Performance improvements

## License
Copyright (c) 2014 Arvind Ravulavaru. Licensed under the MIT license.
