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


### Write/Save to Collection
```js
db.collectioName.save(object);
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
This will return all the articles which have a rating of 5.

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
db.collectioName.remove(query, multi);
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

## Performance
To validate diskDB's performance and to check if it meets your needs, you can clone this repo and run

```bash
$ node performance/time.js
```
An average of few tests can be found below

#### Time taken to process x number of objects (in ms) vs Action Performed

<table>
    <tr>
        <td></td>
        <td>1 (object)</td>
        <td>1000 (objects)</td>
        <td>10000 (objects)</td>
        <td>100000 (objects)</td>
        <td>1000000 (objects)</td>
    </tr>
    <tr>
        <td>Save</td>
        <td>1 (ms)</td>
        <td>15 (ms)</td>
        <td>137 (ms)</td>
        <td>1782 (ms)</td>
        <td>14425 (ms)</td>
    </tr>
    <tr>
        <td>Find all without query</td>
        <td>0 (ms)</td>
        <td>2 (ms)</td>
        <td>12 (ms)</td>
        <td>204 (ms)</td>
        <td>2923 (ms)</td>
    </tr>
    <tr>
        <td>Find all with query</td>
        <td>0 (ms)</td>
        <td>2 (ms)</td>
        <td>17 (ms)</td>
        <td>738 (ms)</td>
        <td>1985 (ms)</td>
    </tr>
    <tr>
        <td>Find one without query</td>
        <td>0 (ms)</td>
        <td>1 (ms)</td>
        <td>9 (ms)</td>
        <td>791 (ms)</td>
        <td>1676 (ms)</td>
    </tr>
    <tr>
        <td>Find one with query</td>
        <td>0 (ms)</td>
        <td>1 (ms)</td>
        <td>8 (ms)</td>
        <td>219 (ms)</td>
        <td>1410 (ms)</td>
    </tr>
    <tr>
        <td>Update all records</td>
        <td>1 (ms)</td>
        <td>7 (ms)</td>
        <td>61 (ms)</td>
        <td>206 (ms)</td>
        <td>48035 (ms)</td>
    </tr>
    <tr>
        <td>Get count</td>
        <td>0 (ms)</td>
        <td>3 (ms)</td>
        <td>11 (ms)</td>
        <td>260 (ms)</td>
        <td>2420 (ms)</td>
    </tr>
    <tr>
        <td>Remove with query</td>
        <td>0 (ms)</td>
        <td>7 (ms)</td>
        <td>59 (ms)</td>
        <td>984 (ms)</td>
        <td>48191 (ms)</td>
    </tr>
    <tr>
        <td>Remove collection</td>
        <td>0 (ms)</td>
        <td>1 (ms)</td>
        <td>4 (ms)</td>
        <td>52 (ms)</td>
        <td>154 (ms)</td>
    </tr>
    <tr>
        <td>File size</td>
        <td>0.000111 (MB)</td>
        <td>0.116671 (MB)</td>
        <td>1.196671 (MB)</td>
        <td>12.266671 (MB)</td>
        <td>125.666671 (MB)</td>
    </tr>
</table>


## Contributing
See the [CONTRIBUTING Guidelines](https://github.com/arvindr21/diskDB/blob/master/CONTRIBUTING.md)

## Release History
* 0.1.x
  * Base Module with
    * Connect to a Folder
    * Access a Collection/File
    * Create Read Update Delete on JSON object
    * Minor fixes and tests

## License
Copyright (c) 2014 Arvind Ravulavaru. Licensed under the MIT license.