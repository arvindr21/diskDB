# diskDB [![Build Status](https://secure.travis-ci.org/arvindr21/diskDB.png?branch=master)](https://travis-ci.org/arvindr21/diskDB) [![NPM version](https://badge-me.herokuapp.com/api/npm/diskdb.png)](http://badges.enytc.com/for/npm/diskdb) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/arvindr21/diskdb/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![NPM](https://nodei.co/npm/diskdb.png?downloads=true&stars=true)](https://nodei.co/npm/diskdb/)

A Lightweight Disk based JSON Database with a MongoDB like API for Node.

_You will never know that you are interacting with a File System_

##Contents

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

## Getting Started
Install the module with: `npm install diskdb`

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
Filename will be the name of the JSON file. You can omit the extenstion, diskDB will take care of it for you.

```js
var db = require('diskdb');
db = db.connect('/examples/db', ['articles']);
// or simply
db.connect('/examples/db', ['articles']);
```

This will check for a directory at given path, if it does not exits, diskDB will throw an error and exit. 

If the directory exists but the file/collection does not exist, diskDB will create it for you. 

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

### Write/Save to Collection
```js
db.collectioName.save(object);
```
Once you have created a collection, you can access the collection methods using the dot notation like

```js
db.articles.[methodname]
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

### Read from Collection
There are 2 methods available for reading the JSON collection
* db.collectioName.find(query)
* db.collectioName.findOne(query)


#### db.collectioName.find() 
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
This will return all the articles who have a rating of 5.

#### db.collectioName.findOne(query)
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.findOne();
```

If you do not pass a query, diskDB will return the first article in the collection. If you pass a query, it will return first article in the filtered data

```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.findOne({_id: '0f6047c6c69149f0be0c8f5943be91be'});
```
### Update Collection
```js
db.collectioName.update(query, data, options);
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

### Remove Collection
```js
db.collectioName.remove(query);
```
You can remove the entire collection (including the file) or you can remove the matched objects by passing in a query.

```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.remove({rating : "5 stars"});
```
Will remove only the matched objects, where as 
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.remove();
```
Will remove the file from folder.

### Count
```js
db.collectioName.count();
```
Will return the count of objects in the Collection
```js
var db = require('diskdb');
db.connect('/examples/db', ['articles']);
db.articles.count(); // will give the count
```

## Examples
Refer to the [examples](https://github.com/arvindr21/diskDB/tree/master/examples) folder.

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/arvindr21/disDB/blob/master/CONTRIBUTING.md)

## Release History
* 0.1.x
  * Base Module with
    * Connect to a Folder
    * Access a Collection/File
    * Create Read Update Delete on JSON object
    * minor fixes and tests

## License
Copyright (c) 2014 Arvind Ravulavaru. Licensed under the MIT license.
